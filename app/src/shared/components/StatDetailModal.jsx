import { X } from "lucide-react";
import { useAppContext } from "../context/useAppContext";

export default function StatDetailModal({ openStat, setOpenStat }) {
  const { enrichedVerbs } = useAppContext();

  if (!openStat) return null;

  const titles = {
    mastered: "Выученные слова",
    starred: "Избранные слова",
    reviews: "Самые повторяемые",
  };

  const emptyMessages = {
    mastered: "Пока нет выученных слов. Пройди тест, чтобы выучить!",
    starred: "Нет избранных слов. Нажми звёздочку в словаре!",
    reviews: "Пока нет повторений. Начни тестирование!",
  };

  const getFilteredVerbs = () => {
    if (openStat === "mastered") return enrichedVerbs.filter((v) => v.progress.known);
    if (openStat === "starred") return enrichedVerbs.filter((v) => v.progress.starred);
    if (openStat === "reviews") return [...enrichedVerbs].filter((v) => v.progress.reviews > 0).sort((a, b) => b.progress.reviews - a.progress.reviews);
    return [];
  };

  const filtered = getFilteredVerbs();

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
        <h2 className="text-lg font-semibold text-zinc-900">{titles[openStat]}</h2>
        <button type="button" onClick={() => setOpenStat(null)} className="rounded-lg bg-zinc-100 p-2 text-zinc-600 transition hover:bg-zinc-200">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {filtered.length ? (
          filtered.map((v) => (
            <div key={v.base} className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5">
              <div>
                <span className="font-medium text-zinc-900">{v.base}</span>
                <span className="ml-2 text-sm text-zinc-400">{v.past} — {v.pp}</span>
              </div>
              {openStat === "reviews" ? (
                <span className="text-sm font-medium text-blue-600">{v.progress.reviews} повт.</span>
              ) : (
                <span className="text-sm text-zinc-500">{v.ru}</span>
              )}
            </div>
          ))
        ) : (
          <div className="text-sm text-zinc-400 text-center py-8">{emptyMessages[openStat]}</div>
        )}
      </div>
    </div>
  );
}
