import { useState } from "react";
import IrregularVerbsUnit from "./units/irregular-verbs";
import IdiomsUnit from "./units/idioms";
import ExamPrepUnit from "./units/exam-prep";

const UNITS = [
  {
    id: "irregular-verbs",
    title: "Неправильные глаголы",
    description: "Тренажёр форм Past Simple и Past Participle",
    emoji: "📖",
    component: IrregularVerbsUnit,
    ready: true,
  },
  {
    id: "idioms",
    title: "Идиомы и фразовые глаголы",
    description: "Популярные выражения и phrasal verbs",
    emoji: "💬",
    component: IdiomsUnit,
    ready: false,
  },
  {
    id: "exam-prep",
    title: "Подготовка к экзамену",
    description: "Темы и задания для подготовки",
    emoji: "📝",
    component: ExamPrepUnit,
    ready: true,
  },
];

function UnitSelector({ onSelect }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-zinc-900">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 pt-12 pb-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-zinc-800 mb-2">English Trainer</h1>
          <p className="text-zinc-500">Выбери раздел для изучения</p>
        </div>

        <div className="flex flex-col gap-4">
          {UNITS.map((unit) => (
            <button
              key={unit.id}
              onClick={() => onSelect(unit.id)}
              className={`relative flex items-start gap-4 rounded-2xl border p-5 text-left transition-all
                ${unit.ready
                  ? "border-zinc-200 bg-white shadow-sm hover:shadow-md hover:border-blue-300 active:scale-[0.98]"
                  : "border-zinc-100 bg-zinc-50 opacity-60 cursor-default"
                }`}
              disabled={!unit.ready}
            >
              <span className="text-4xl">{unit.emoji}</span>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-zinc-800">{unit.title}</h2>
                <p className="text-sm text-zinc-500 mt-1">{unit.description}</p>
                {!unit.ready && (
                  <span className="inline-block mt-2 text-xs font-medium text-zinc-400 bg-zinc-100 rounded-full px-3 py-1">
                    Скоро
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeUnit, setActiveUnit] = useState(null);

  const unit = UNITS.find((u) => u.id === activeUnit);
  if (unit) {
    const UnitComponent = unit.component;
    return <UnitComponent onBack={() => setActiveUnit(null)} />;
  }

  return <UnitSelector onSelect={setActiveUnit} />;
}
