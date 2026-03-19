import { useState, useCallback, useMemo } from "react";

const STORAGE_KEY = "exam-prep-progress";

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// Shuffle array (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function useExamQuiz(topic, sectionId) {
  const [progress, setProgress] = useState(loadProgress);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [sessionResults, setSessionResults] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const section = useMemo(
    () => topic?.sections.find((s) => s.id === sectionId),
    [topic, sectionId]
  );

  const questions = useMemo(
    () => (section ? shuffle(section.questions) : []),
    [section]
  );

  const current = questions[currentIndex] || null;
  const total = questions.length;

  const checkAnswer = useCallback(() => {
    if (!current || isAnswered) return;

    let isCorrect = false;
    if (current.type === "choice") {
      isCorrect = selectedAnswer === current.answer;
    } else if (current.type === "fill") {
      const normalized = typedAnswer.trim().toLowerCase();
      isCorrect = current.accept
        ? current.accept.some((a) => a.toLowerCase() === normalized)
        : normalized === current.answer.toLowerCase();
    }

    setIsAnswered(true);
    setSessionResults((prev) => [...prev, { question: current, isCorrect }]);

    // Save to progress
    const key = `${topic.id}__${sectionId}`;
    setProgress((prev) => {
      const updated = {
        ...prev,
        [key]: {
          total: (prev[key]?.total || 0) + 1,
          correct: (prev[key]?.correct || 0) + (isCorrect ? 1 : 0),
          lastAttempt: Date.now(),
        },
      };
      saveProgress(updated);
      return updated;
    });
  }, [current, isAnswered, selectedAnswer, typedAnswer, topic, sectionId]);

  const next = useCallback(() => {
    if (currentIndex + 1 >= total) {
      setIsFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setTypedAnswer("");
      setIsAnswered(false);
    }
  }, [currentIndex, total]);

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setTypedAnswer("");
    setIsAnswered(false);
    setSessionResults([]);
    setIsFinished(false);
  }, []);

  const stats = useMemo(() => {
    const key = `${topic?.id}__${sectionId}`;
    return progress[key] || { total: 0, correct: 0 };
  }, [progress, topic, sectionId]);

  return {
    current,
    currentIndex,
    total,
    isAnswered,
    isFinished,
    selectedAnswer,
    setSelectedAnswer,
    typedAnswer,
    setTypedAnswer,
    checkAnswer,
    next,
    restart,
    sessionResults,
    stats,
  };
}
