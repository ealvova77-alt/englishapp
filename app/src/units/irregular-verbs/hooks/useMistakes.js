import { useState, useMemo, useCallback } from "react";
import { isCorrect } from "../../../shared/utils/string";
import { shuffle } from "../../../shared/utils/string";

export default function useMistakes(enrichedVerbs, updateProgress) {
  const [mistakesMode, setMistakesMode] = useState("list");
  const [mistakeVerbBase, setMistakeVerbBase] = useState(null);
  const [mistakeAnswerPast, setMistakeAnswerPast] = useState("");
  const [mistakeAnswerPP, setMistakeAnswerPP] = useState("");
  const [mistakeFeedback, setMistakeFeedback] = useState(null);

  const mistakeVerbs = useMemo(
    () => enrichedVerbs.filter((v) => v.progress.mistaken),
    [enrichedVerbs]
  );

  const mistakeVerb = useMemo(() => {
    if (!mistakeVerbBase) return null;
    return enrichedVerbs.find((v) => v.base === mistakeVerbBase) || null;
  }, [enrichedVerbs, mistakeVerbBase]);

  const submitMistakeQuiz = useCallback(() => {
    if (!mistakeVerb) return;
    const okPast = isCorrect(mistakeAnswerPast, mistakeVerb.past);
    const okPP = isCorrect(mistakeAnswerPP, mistakeVerb.pp);
    const success = okPast && okPP;
    setMistakeFeedback({ success, okPast, okPP, userPast: mistakeAnswerPast, userPP: mistakeAnswerPP });
    if (success) {
      updateProgress(mistakeVerb.base, (current) => ({ ...current, mistaken: false }));
    }
  }, [mistakeVerb, mistakeAnswerPast, mistakeAnswerPP, updateProgress]);

  const startTraining = useCallback(() => {
    setMistakesMode("train");
    setMistakeFeedback(null);
    setMistakeAnswerPast("");
    setMistakeAnswerPP("");
    const pool = enrichedVerbs.filter((v) => v.progress.mistaken);
    if (pool.length) setMistakeVerbBase(shuffle(pool)[0].base);
  }, [enrichedVerbs]);

  const nextMistake = useCallback(() => {
    const pool = enrichedVerbs.filter((v) => v.progress.mistaken);
    if (!pool.length) {
      setMistakesMode("list");
      return;
    }
    const next = shuffle(pool).find((v) => v.base !== mistakeVerb?.base) || pool[0];
    setMistakeVerbBase(next.base);
    setMistakeAnswerPast("");
    setMistakeAnswerPP("");
    setMistakeFeedback(null);
  }, [enrichedVerbs, mistakeVerb]);

  const handleMistakeKeyDown = useCallback((e) => {
    if (e.key !== "Enter") return;
    if (mistakeFeedback) {
      nextMistake();
    } else {
      submitMistakeQuiz();
    }
  }, [mistakeFeedback, nextMistake, submitMistakeQuiz]);

  return {
    mistakesMode,
    setMistakesMode,
    mistakeVerbs,
    mistakeVerb,
    mistakeAnswerPast,
    setMistakeAnswerPast,
    mistakeAnswerPP,
    setMistakeAnswerPP,
    mistakeFeedback,
    submitMistakeQuiz,
    startTraining,
    nextMistake,
    handleMistakeKeyDown,
  };
}
