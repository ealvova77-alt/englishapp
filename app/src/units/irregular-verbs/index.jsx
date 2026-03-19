import { useState, useMemo } from "react";
import { AppProvider } from "../../shared/context/AppContext";
import useToast from "../../shared/hooks/useToast";
import useAppState from "./hooks/useAppState";
import useWordList from "./hooks/useWordList";
import useQuiz from "./hooks/useQuiz";
import useMistakes from "./hooks/useMistakes";
import LearnTab from "./tabs/LearnTab";
import WordsTab from "./tabs/WordsTab";
import MistakesTab from "./tabs/MistakesTab";
import ProgressTab from "./tabs/ProgressTab";
import BottomNavigation from "../../shared/components/BottomNavigation";
import StatDetailModal from "../../shared/components/StatDetailModal";
import Toast from "../../shared/components/ui/Toast";

function IrregularVerbsContent({ onBack }) {
  const { toast, showToast } = useToast();
  const appState = useAppState(showToast);
  const { enrichedVerbs, settings, updateProgress, registerStudyActivity, todayKey } = appState;

  const wordList = useWordList(enrichedVerbs, settings);
  const quiz = useQuiz(enrichedVerbs, updateProgress, registerStudyActivity, todayKey);
  const mistakes = useMistakes(enrichedVerbs, updateProgress);

  const [tab, setTab] = useState("words");
  const [openStat, setOpenStat] = useState(null);

  const contextValue = useMemo(() => ({
    ...appState,
    toast,
    showToast,
  }), [appState, toast, showToast]);

  return (
    <AppProvider value={contextValue}>
      <div className="min-h-screen text-zinc-900">
        <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col pb-24">
          {/* Back button */}
          <div className="px-4 pt-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Назад
            </button>
          </div>
          <main className="flex-1 px-4 pt-2 pb-4">
            {tab === "learn" ? <LearnTab quiz={quiz} /> : null}
            {tab === "words" ? <WordsTab wordList={wordList} /> : null}
            {tab === "mistakes" ? <MistakesTab mistakes={mistakes} /> : null}
            {tab === "progress" ? <ProgressTab openStat={openStat} setOpenStat={setOpenStat} /> : null}
          </main>
          <BottomNavigation tab={tab} setTab={setTab} />
          {openStat ? <StatDetailModal openStat={openStat} setOpenStat={setOpenStat} /> : null}
          <Toast message={toast} />
        </div>
      </div>
    </AppProvider>
  );
}

export default function IrregularVerbsUnit({ onBack }) {
  return <IrregularVerbsContent onBack={onBack} />;
}
