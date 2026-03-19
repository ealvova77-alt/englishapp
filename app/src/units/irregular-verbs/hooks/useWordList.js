import { useState, useMemo, useEffect } from "react";
import { speakVerb } from "../../../shared/utils/audio";

export default function useWordList(enrichedVerbs, settings) {
  const [search, setSearch] = useState("");
  const [learnFilter, setLearnFilter] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const filteredVerbs = useMemo(() => {
    let result = enrichedVerbs.filter((verb) => {
      const haystack = `${verb.base} ${verb.past} ${verb.pp} ${verb.ru}`.toLowerCase();
      const searchOk = haystack.includes(search.toLowerCase());
      if (!searchOk) return false;
      if (learnFilter === "starred") return verb.progress.starred;
      if (learnFilter === "mistakes") return verb.progress.mistaken;
      if (learnFilter === "unlearned") return !verb.progress.known;
      if (learnFilter === "hard") return verb.difficulty === "hard";
      if (["basic", "advanced", "rare"].includes(learnFilter)) return verb.level === learnFilter;
      if (learnFilter === "common") return verb.common;
      return true;
    });
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const hasRussian = /[а-яё]/i.test(q);
      if (hasRussian) {
        const ruWords = result.map((v) => {
          const translations = v.ru.toLowerCase().split(/,\s*/);
          const exactMatch = translations.some((t) => t === q);
          const startMatch = translations.some((t) => t.startsWith(q));
          const score = exactMatch ? 2 : startMatch ? 1 : 0;
          return { v, score };
        });
        ruWords.sort((a, b) => b.score - a.score);
        result = ruWords.filter((r) => r.score > 0).length
          ? ruWords.filter((r) => r.score > 0).map((r) => r.v)
          : ruWords.slice(0, 3).map((r) => r.v);
      } else {
        const exact = result.find((v) => v.base === q || v.past === q || v.pp === q);
        result = exact ? [exact] : result.slice(0, 1);
      }
    }
    return result;
  }, [enrichedVerbs, search, learnFilter]);

  const safeSelectedIndex = filteredVerbs.length
    ? Math.min(selectedIndex, filteredVerbs.length - 1)
    : 0;
  const currentVerb = filteredVerbs[safeSelectedIndex] || enrichedVerbs[0] || null;

  useEffect(() => {
    if (!settings.autoplayAudio || !currentVerb) return;
    speakVerb(currentVerb, settings.speechRate);
  }, [currentVerb, settings.autoplayAudio, settings.speechRate]);

  function revealCard(updateProgress, registerStudyActivity, todayKey) {
    if (!currentVerb) return;
    if (!revealed) {
      updateProgress(currentVerb.base, (current) => ({
        ...current,
        reviews: (current.reviews || 0) + 1,
        lastSeen: todayKey,
      }));
      registerStudyActivity(1);
    }
    setRevealed((prev) => !prev);
  }

  function nextCard() {
    if (!filteredVerbs.length) return;
    setSelectedIndex((safeSelectedIndex + 1) % filteredVerbs.length);
    setRevealed(false);
  }

  function prevCard() {
    if (!filteredVerbs.length) return;
    setSelectedIndex((safeSelectedIndex - 1 + filteredVerbs.length) % filteredVerbs.length);
    setRevealed(false);
  }

  return {
    search,
    setSearch,
    learnFilter,
    setLearnFilter,
    selectedIndex,
    revealed,
    filteredVerbs,
    currentVerb,
    revealCard,
    nextCard,
    prevCard,
  };
}
