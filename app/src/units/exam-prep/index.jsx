import { useCallback, useMemo, useState } from "react";
import { TOPICS } from "./data/topics";
import talkingManifest from "./data/talking/manifest.json";
import useExamQuiz from "./hooks/useExamQuiz";
import TopicList from "./components/TopicList";
import QuizCard from "./components/QuizCard";
import ResultScreen from "./components/ResultScreen";
import TalkingTopicList from "./components/TalkingTopicList";
import TalkingTopicScreen from "./components/TalkingTopicScreen";

const STORAGE_KEY = "exam-prep-progress";
const TALKING_PACKS = talkingManifest.packs;
const TALKING_TOPICS = talkingManifest.topics;

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function BackButton({ onClick, label = "Back" }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
      {label}
    </button>
  );
}

function QuizScreen({ topic, sectionId, onBack }) {
  const quiz = useExamQuiz(topic, sectionId);
  const section = topic.sections.find((item) => item.id === sectionId);

  if (quiz.isFinished) {
    return (
      <ResultScreen
        results={quiz.sessionResults}
        onRestart={quiz.restart}
        onBack={onBack}
        stats={quiz.stats}
      />
    );
  }

  if (!quiz.current) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold text-zinc-800">{topic.title}</h2>
        <p className="text-sm text-zinc-500">{section?.title}</p>
      </div>
      <QuizCard
        question={quiz.current}
        currentIndex={quiz.currentIndex}
        total={quiz.total}
        isAnswered={quiz.isAnswered}
        selectedAnswer={quiz.selectedAnswer}
        setSelectedAnswer={quiz.setSelectedAnswer}
        typedAnswer={quiz.typedAnswer}
        setTypedAnswer={quiz.setTypedAnswer}
        onCheck={quiz.checkAnswer}
        onNext={quiz.next}
        isLast={quiz.currentIndex + 1 >= quiz.total}
      />
    </div>
  );
}

export default function ExamPrepUnit({ onBack }) {
  const [screen, setScreen] = useState("topics");
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [activeSpeakingPack, setActiveSpeakingPack] = useState(null);
  const [activeSpeakingTopic, setActiveSpeakingTopic] = useState(null);
  const [progress, setProgress] = useState(loadProgress);

  const handleSelectQuizSection = useCallback((topicId, sectionId) => {
    setActiveTopic(topicId);
    setActiveSection(sectionId);
    setScreen("quiz");
  }, []);

  const handleOpenSpeaking = useCallback(() => {
    setScreen("speaking-list");
    if (!activeSpeakingPack && TALKING_PACKS.length) {
      setActiveSpeakingPack(TALKING_PACKS[0].id);
    }
  }, [activeSpeakingPack]);

  const handleBackToTopics = useCallback(() => {
    setScreen("topics");
    setActiveTopic(null);
    setActiveSection(null);
    setProgress(loadProgress());
  }, []);

  const handleSelectSpeakingPack = useCallback((packId) => {
    setActiveSpeakingPack(packId);
  }, []);

  const handleOpenSpeakingTopic = useCallback((topicId, packId) => {
    setActiveSpeakingPack(packId);
    setActiveSpeakingTopic(topicId);
    setScreen("speaking-topic");
  }, []);

  const handleBackToSpeakingTopics = useCallback(() => {
    setScreen("speaking-list");
    setActiveSpeakingTopic(null);
  }, []);

  const activeQuizTopic = TOPICS.find((topic) => topic.id === activeTopic);
  const speakingSummary = useMemo(
    () => ({
      packCount: TALKING_PACKS.length,
      topicCount: TALKING_TOPICS.length,
      questionCount: TALKING_TOPICS.reduce((sum, topic) => sum + topic.questionCount, 0),
    }),
    []
  );

  const backAction = screen === "quiz"
    ? handleBackToTopics
    : screen === "speaking-topic"
    ? handleBackToSpeakingTopics
    : screen === "speaking-list"
    ? handleBackToTopics
    : onBack;

  const backLabel = screen === "quiz"
    ? "Back to quizzes"
    : screen === "speaking-topic"
    ? "Back to speaking"
    : screen === "speaking-list"
    ? "Back to topics"
    : "Back";

  return (
    <div className="min-h-screen text-zinc-900">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col pb-8">
        <div className="px-4 pt-3">
          <BackButton onClick={backAction} label={backLabel} />
        </div>
        <main className="flex-1 px-4 pt-2 pb-4">
          {screen === "topics" && (
            <TopicList
              topics={TOPICS}
              onSelect={handleSelectQuizSection}
              progress={progress}
              onOpenSpeaking={handleOpenSpeaking}
              speakingSummary={speakingSummary}
            />
          )}

          {screen === "quiz" && activeQuizTopic && (
            <QuizScreen
              topic={activeQuizTopic}
              sectionId={activeSection}
              onBack={handleBackToTopics}
            />
          )}

          {screen === "speaking-list" && (
            <TalkingTopicList
              packs={TALKING_PACKS}
              topics={TALKING_TOPICS}
              selectedPackId={activeSpeakingPack}
              onSelectPack={handleSelectSpeakingPack}
              onOpenTopic={handleOpenSpeakingTopic}
            />
          )}

          {screen === "speaking-topic" && activeSpeakingTopic && (
            <TalkingTopicScreen topicId={activeSpeakingTopic} />
          )}
        </main>
      </div>
    </div>
  );
}
