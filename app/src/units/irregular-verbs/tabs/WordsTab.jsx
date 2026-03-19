import { Search, Star, Volume2 } from "lucide-react";
import { useAppContext } from "../../../shared/context/useAppContext";
import FilterChip from "../../../shared/components/ui/FilterChip";
import Badge from "../../../shared/components/ui/Badge";
import { LEVEL_LABELS } from "../data/constants";
import { primaryVariant } from "../../../shared/utils/string";
import { speakText, speakVerb, speakAllForms } from "../../../shared/utils/audio";

export default function WordsTab({ wordList }) {
  const { toggleStar, settings } = useAppContext();
  const { search, setSearch, learnFilter, setLearnFilter, filteredVerbs } = wordList;

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по глаголу, форме или переводу"
            className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <FilterChip active={learnFilter === "all"} onClick={() => setLearnFilter("all")}>Все</FilterChip>
          <FilterChip active={learnFilter === "common"} onClick={() => setLearnFilter("common")}>Частые</FilterChip>
          <FilterChip active={learnFilter === "basic"} onClick={() => setLearnFilter("basic")}>Базовые</FilterChip>
          <FilterChip active={learnFilter === "advanced"} onClick={() => setLearnFilter("advanced")}>Продвинутые</FilterChip>
          <FilterChip active={learnFilter === "rare"} onClick={() => setLearnFilter("rare")}>Редкие</FilterChip>
          <FilterChip active={learnFilter === "hard"} onClick={() => setLearnFilter("hard")}>Сложные</FilterChip>
          <FilterChip active={learnFilter === "starred"} onClick={() => setLearnFilter("starred")}>Избранное</FilterChip>
          <FilterChip active={learnFilter === "mistakes"} onClick={() => setLearnFilter("mistakes")}>Ошибки</FilterChip>
          <FilterChip active={learnFilter === "unlearned"} onClick={() => setLearnFilter("unlearned")}>Не выученные</FilterChip>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-900">Словарь</h1>
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">{filteredVerbs.length} слов</span>
      </div>

      {filteredVerbs.length ? (
        <div className="space-y-3">
          {filteredVerbs.map((verb) => (
            <div key={verb.base} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <div className="text-2xl font-semibold text-zinc-900">{verb.base}</div>
                    <span className="text-sm text-zinc-400">/{verb.tr}/</span>
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-sm text-zinc-500">{verb.ru}</span>
                    <Badge>{LEVEL_LABELS[verb.level]}</Badge>
                    {verb.common ? <Badge tone="dark">частый</Badge> : null}
                  </div>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button onClick={() => toggleStar(verb)} className={`rounded-lg p-2 transition-all active:scale-[0.95] ${verb.progress.starred ? "bg-amber-50 text-amber-500" : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"}`} title="В избранное"><Star className={`h-4 w-4 ${verb.progress.starred ? "fill-amber-400" : ""}`} /></button>
                  <button onClick={() => speakVerb(verb, settings.speechRate)} className="rounded-lg bg-zinc-100 p-2 text-zinc-500 transition-all hover:bg-zinc-200 active:scale-[0.95]" title="Озвучить слово"><Volume2 className="h-4 w-4" /></button>
                  <button onClick={() => speakAllForms(verb, settings.speechRate)} className="rounded-lg bg-zinc-100 px-2.5 py-2 text-xs font-medium text-zinc-500 transition-all hover:bg-zinc-200 active:scale-[0.95]">Все</button>
                </div>
              </div>

              <div className="mt-3 grid gap-px overflow-hidden rounded-xl border border-zinc-100 md:grid-cols-3">
                <div className="bg-zinc-50 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">Infinitive</div>
                      <div className="text-base font-semibold text-zinc-900">{verb.base} <span className="text-xs font-normal text-zinc-400">/{verb.tr}/</span></div>
                    </div>
                    <button onClick={() => speakText(primaryVariant(verb.base), settings.speechRate)} className="shrink-0 rounded-md bg-white p-1.5 text-zinc-400 hover:text-zinc-600 transition-all active:scale-[0.95]"><Volume2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
                <div className="bg-zinc-50 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">Past Simple</div>
                      <div className="text-base font-semibold text-zinc-900">{verb.past} <span className="text-xs font-normal text-zinc-400">/{verb.trPast}/</span></div>
                    </div>
                    <button onClick={() => speakText(primaryVariant(verb.past), settings.speechRate)} className="shrink-0 rounded-md bg-white p-1.5 text-zinc-400 hover:text-zinc-600 transition-all active:scale-[0.95]"><Volume2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
                <div className="bg-zinc-50 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">Past Participle</div>
                      <div className="text-base font-semibold text-zinc-900">{verb.pp} <span className="text-xs font-normal text-zinc-400">/{verb.trPP}/</span></div>
                    </div>
                    <button onClick={() => speakText(primaryVariant(verb.pp), settings.speechRate)} className="shrink-0 rounded-md bg-white p-1.5 text-zinc-400 hover:text-zinc-600 transition-all active:scale-[0.95]"><Volume2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-400 text-center shadow-sm">Ничего не найдено. Сбрось фильтр или очисти поиск.</div>
      )}
    </div>
  );
}
