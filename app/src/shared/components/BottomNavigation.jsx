import { AlertTriangle, BookOpen, Brain, Trophy } from "lucide-react";
import BottomTab from "./ui/BottomTab";

export default function BottomNavigation({ tab, setTab }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-sm border-t border-zinc-200 px-4 py-3">
      <div className="mx-auto flex w-full max-w-xl gap-2 p-1">
        <BottomTab active={tab === "words"} onClick={() => setTab("words")} icon={BookOpen} label="Словарь" />
        <BottomTab active={tab === "learn"} onClick={() => setTab("learn")} icon={Brain} label="Тест" />
        <BottomTab active={tab === "mistakes"} onClick={() => setTab("mistakes")} icon={AlertTriangle} label="Ошибки" />
        <BottomTab active={tab === "progress"} onClick={() => setTab("progress")} icon={Trophy} label="Прогресс" />
      </div>
    </nav>
  );
}
