import { CheckCircle2, Volume2 } from "lucide-react";
import { useAppContext } from "../../../shared/context/useAppContext";
import FilterChip from "../../../shared/components/ui/FilterChip";
import { speakVerb } from "../../../shared/utils/audio";

export default function MistakesTab({ mistakes }) {
  const { settings } = useAppContext();
  const {
    mistakesMode, mistakeVerbs, mistakeVerb,
    mistakeAnswerPast, setMistakeAnswerPast,
    mistakeAnswerPP, setMistakeAnswerPP,
    mistakeFeedback, submitMistakeQuiz, startTraining, nextMistake, handleMistakeKeyDown,
  } = mistakes;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-900">Работа над ошибками</h1>
        <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-600">{mistakeVerbs.length} слов</span>
      </div>

      {mistakeVerbs.length ? (
        <>
          <div className="flex gap-2">
            <FilterChip active={mistakesMode === "list"} onClick={() => mistakes.setMistakesMode("list")}>Список</FilterChip>
            <FilterChip active={mistakesMode === "train"} onClick={startTraining}>Тренировать</FilterChip>
          </div>

          {mistakesMode === "list" ? (
            <div className="space-y-3">
              {mistakeVerbs.map((v) => (
                <div key={v.base} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <div className="text-2xl font-semibold text-zinc-900">{v.base}</div>
                        <span className="text-sm text-zinc-400">/{v.tr}/</span>
                      </div>
                      <div className="mt-0.5 text-sm text-zinc-500">{v.ru}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-600">{v.progress.wrong} ош.</span>
                      <button onClick={() => speakVerb(v, settings.speechRate)} className="rounded-lg bg-zinc-100 p-2 text-zinc-500 transition-all hover:bg-zinc-200 active:scale-[0.95]"><Volume2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <div className="mt-3 grid gap-px overflow-hidden rounded-xl border border-zinc-100 md:grid-cols-3">
                    <div className="bg-zinc-50 p-3">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">Infinitive</div>
                      <div className="text-base font-semibold text-zinc-900">{v.base}</div>
                    </div>
                    <div className="bg-zinc-50 p-3">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">Past Simple</div>
                      <div className="text-base font-semibold text-zinc-900">{v.past}</div>
                    </div>
                    <div className="bg-zinc-50 p-3">
                      <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">Past Participle</div>
                      <div className="text-base font-semibold text-zinc-900">{v.pp}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-zinc-400">Исправь ошибку</div>
                    <h2 className="mt-1.5 text-4xl font-bold tracking-tight text-zinc-900">{mistakeVerb?.base}</h2>
                    <div className="mt-1 text-zinc-500">{mistakeVerb?.ru}</div>
                  </div>
                  <button onClick={() => speakVerb(mistakeVerb, settings.speechRate)} className="rounded-xl bg-zinc-100 p-3 text-zinc-600 transition-all hover:bg-zinc-200 active:scale-[0.95]"><Volume2 className="h-5 w-5" /></button>
                </div>

                <div className="mt-5 space-y-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-700">Past Simple</label>
                    <input value={mistakeAnswerPast} onChange={(e) => setMistakeAnswerPast(e.target.value)} onKeyDown={handleMistakeKeyDown} disabled={Boolean(mistakeFeedback)} placeholder="Введи Past Simple" className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 outline-none transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-400 disabled:opacity-60" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-zinc-700">Past Participle</label>
                    <input value={mistakeAnswerPP} onChange={(e) => setMistakeAnswerPP(e.target.value)} onKeyDown={handleMistakeKeyDown} disabled={Boolean(mistakeFeedback)} placeholder="Введи Past Participle" className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 outline-none transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-400 disabled:opacity-60" />
                  </div>
                </div>

                {mistakeFeedback ? (
                  <div className="mt-4">
                    <div className={`rounded-xl p-4 ${mistakeFeedback.success ? "bg-emerald-50 border border-emerald-200" : "bg-rose-50 border border-rose-200"}`}>
                      <div className={`font-semibold ${mistakeFeedback.success ? "text-emerald-800" : "text-rose-800"}`}>{mistakeFeedback.success ? "✓ Верно! Слово убрано из ошибок" : "✗ Есть ошибки"}</div>
                      <div className="mt-3 space-y-2">
                        <div className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${mistakeFeedback.okPast ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
                          <div>
                            <span className="font-medium">Past Simple: </span>
                            {mistakeFeedback.okPast ? <span>{mistakeFeedback.userPast} ✓</span> : <span><s className="text-rose-400">{mistakeFeedback.userPast || "(пусто)"}</s> → <span className="font-semibold">{mistakeVerb?.past}</span></span>}
                          </div>
                        </div>
                        <div className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${mistakeFeedback.okPP ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
                          <div>
                            <span className="font-medium">Past Participle: </span>
                            {mistakeFeedback.okPP ? <span>{mistakeFeedback.userPP} ✓</span> : <span><s className="text-rose-400">{mistakeFeedback.userPP || "(пусто)"}</s> → <span className="font-semibold">{mistakeVerb?.pp}</span></span>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="button" onClick={nextMistake} className="mt-4 w-full rounded-xl bg-zinc-800 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-900 active:scale-[0.98]">Следующий →</button>
                  </div>
                ) : (
                  <div className="mt-4">
                    <button type="button" onClick={submitMistakeQuiz} className="w-full rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 active:scale-[0.98]">Проверить</button>
                  </div>
                )}
              </div>

              <div className="text-center text-xs text-zinc-400">Осталось: {mistakeVerbs.length} слов с ошибками</div>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto h-12 w-12 text-blue-300 mb-3" />
          <div className="text-zinc-800 font-medium">Ошибок пока нет</div>
          <div className="mt-1 text-sm text-zinc-400">Проходи тесты — слова с ошибками появятся здесь</div>
        </div>
      )}
    </div>
  );
}
