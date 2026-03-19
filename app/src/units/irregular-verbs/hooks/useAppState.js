import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { VERBS } from "../data/verbs";
import { COMMON_VERBS, STORAGE_KEY, APP_META_KEY, SETTINGS_KEY } from "../data/constants";
import { safeParse, localDateKey, previousDateKey } from "../../../shared/utils/storage";
import { getDefaultProgressRecord, getDifficulty } from "../../../shared/utils/progress";

const DEFAULT_APP_META = { streak: 0, lastStudyDate: null, dailyActivity: {} };
const DEFAULT_SETTINGS = { dailyGoal: 20, speechRate: 0.95, autoplayAudio: false, exampleMode: "short" };

export default function useAppState(showToast) {
  const todayKey = localDateKey();
  const fileInputRef = useRef(null);

  const [progress, setProgress] = useState(
    () => safeParse(typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null, {})
  );
  const [appMeta, setAppMeta] = useState(
    () => safeParse(typeof window !== "undefined" ? window.localStorage.getItem(APP_META_KEY) : null, DEFAULT_APP_META)
  );
  const [settings, setSettings] = useState(
    () => safeParse(typeof window !== "undefined" ? window.localStorage.getItem(SETTINGS_KEY) : null, DEFAULT_SETTINGS)
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(APP_META_KEY, JSON.stringify(appMeta));
  }, [appMeta]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const registerStudyActivity = useCallback((points = 1) => {
    setAppMeta((prev) => {
      const streak = prev.lastStudyDate === todayKey ? prev.streak : prev.lastStudyDate === previousDateKey(todayKey) ? prev.streak + 1 : 1;
      return {
        ...prev,
        streak,
        lastStudyDate: todayKey,
        dailyActivity: {
          ...(prev.dailyActivity || {}),
          [todayKey]: ((prev.dailyActivity || {})[todayKey] || 0) + points,
        },
      };
    });
  }, [todayKey]);

  const enrichedVerbs = useMemo(() => {
    return VERBS.map((verb) => {
      const record = progress[verb.base] || getDefaultProgressRecord();
      return { ...verb, progress: record, difficulty: getDifficulty(record), common: COMMON_VERBS.has(verb.base) };
    });
  }, [progress]);

  const stats = useMemo(() => {
    const items = enrichedVerbs.map((v) => v.progress);
    const mastered = items.filter((i) => i.known).length;
    const starred = items.filter((i) => i.starred).length;
    const reviews = items.reduce((sum, item) => sum + (item.reviews || 0), 0);
    const totalAnswers = items.reduce((sum, item) => sum + (item.right || 0) + (item.wrong || 0), 0);
    const totalRight = items.reduce((sum, item) => sum + (item.right || 0), 0);
    const hard = enrichedVerbs.filter((v) => v.difficulty === "hard").length;
    const mistakes = items.filter((i) => i.mistaken).length;
    return {
      mastered,
      starred,
      reviews,
      hard,
      mistakes,
      accuracy: totalAnswers ? Math.round((totalRight / totalAnswers) * 100) : 0,
    };
  }, [enrichedVerbs]);

  const updateProgress = useCallback((base, updater) => {
    setProgress((prev) => {
      const current = prev[base] || getDefaultProgressRecord();
      return { ...prev, [base]: updater(current) };
    });
  }, []);

  const toggleStar = useCallback((verb) => {
    updateProgress(verb.base, (current) => ({ ...current, starred: !current.starred }));
  }, [updateProgress]);

  const markKnown = useCallback((verb, known) => {
    updateProgress(verb.base, (current) => ({
      ...current,
      known,
      reviews: (current.reviews || 0) + 1,
      lastSeen: todayKey,
    }));
    registerStudyActivity(1);
    showToast(known ? "Добавлено в выученные" : "Вернули в повторение");
  }, [updateProgress, registerStudyActivity, showToast, todayKey]);

  const exportProgress = useCallback(() => {
    const payload = { version: 1, progress, appMeta, settings, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `irregular-verbs-progress-${todayKey}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Прогресс экспортирован");
  }, [progress, appMeta, settings, todayKey, showToast]);

  const importProgress = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || "{}"));
        setProgress(parsed.progress || {});
        setAppMeta(parsed.appMeta || DEFAULT_APP_META);
        setSettings(parsed.settings || DEFAULT_SETTINGS);
        showToast("Прогресс импортирован");
      } catch {
        showToast("Не удалось импортировать файл");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }, [showToast]);

  const resetAll = useCallback(() => {
    setProgress({});
    setAppMeta(DEFAULT_APP_META);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(APP_META_KEY);
      window.localStorage.removeItem(SETTINGS_KEY);
    }
    showToast("Прогресс сброшен");
  }, [showToast]);

  const shareApp = useCallback(async () => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return;
    const shareData = {
      title: "Irregular Verbs Trainer",
      text: "Тренажёр неправильных глаголов",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error?.name !== "AbortError") {
          showToast("Не удалось поделиться");
        }
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Ссылка скопирована");
    } catch {
      showToast("Не удалось поделиться");
    }
  }, [showToast]);

  const todayDone = appMeta.dailyActivity?.[todayKey] || 0;
  const dailyGoalPercent = Math.min(100, Math.round((todayDone / settings.dailyGoal) * 100));
  const masteredPercent = Math.round((stats.mastered / VERBS.length) * 100);

  return {
    progress,
    appMeta,
    settings,
    setSettings,
    enrichedVerbs,
    stats,
    todayKey,
    todayDone,
    dailyGoalPercent,
    masteredPercent,
    updateProgress,
    toggleStar,
    markKnown,
    registerStudyActivity,
    exportProgress,
    importProgress,
    resetAll,
    shareApp,
    fileInputRef,
    verbCount: VERBS.length,
  };
}
