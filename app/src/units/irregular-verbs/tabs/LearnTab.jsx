import { Brain, CheckCircle2, Star, Trophy, Volume2 } from "lucide-react";
import { useAppContext } from "../../../shared/context/useAppContext";
import FilterChip from "../../../shared/components/ui/FilterChip";
import Badge from "../../../shared/components/ui/Badge";
import StatCard from "../../../shared/components/ui/StatCard";
import { LEVEL_LABELS } from "../data/constants";
import { speakVerb, speakAllForms } from "../../../shared/utils/audio";

export default function LearnTab({ quiz }) {
  const { toggleStar, settings } = useAppContext();
  const { quizState, dispatch, quizVerb, sessionAccuracy, submitQuiz, nextQuiz, handleQuizKeyDown } = quiz;
  const { filter: quizFilter, mode: quizMode, feedback, session, answerPast, answerPP, choiceSelected, choiceQuestion, translateSelected, translateQuestion } = quizState;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        <FilterChip active={quizFilter === "hard"} onClick={() => dispatch({ type: "SET_FILTER", value: "hard" })}>Сложные</FilterChip>
        <FilterChip active={quizFilter === "common"} onClick={() => dispatch({ type: "SET_FILTER", value: "common" })}>Частые</FilterChip>
        <FilterChip active={quizFilter === "basic"} onClick={() => dispatch({ type: "SET_FILTER", value: "basic" })}>Базовые</FilterChip>
        <FilterChip active={quizFilter === "advanced"} onClick={() => dispatch({ type: "SET_FILTER", value: "advanced" })}>Продвинутые</FilterChip>
        <FilterChip active={quizFilter === "rare"} onClick={() => dispatch({ type: "SET_FILTER", value: "rare" })}>Редкие</FilterChip>
        <FilterChip active={quizFilter === "all"} onClick={() => dispatch({ type: "SET_FILTER", value: "all" })}>Все</FilterChip>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-zinc-400">Infinitive</div>
              <h2 className="mt-1.5 text-4xl font-bold tracking-tight text-zinc-900">{quizVerb?.base}</h2>
              {quizMode !== "translate" ? <div className="mt-1 text-zinc-500">{quizVerb?.ru}</div> : <div className="mt-1 text-sm text-blue-600">{translateQuestion.direction === "en-ru" ? "Подбери перевод" : "Подбери слово"}</div>}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {quizVerb?.level ? <Badge>{LEVEL_LABELS[quizVerb.level]}</Badge> : null}
                {quizVerb?.common ? <Badge tone="dark">частый</Badge> : null}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggleStar(quizVerb)} className={`rounded-xl p-3 transition-all active:scale-[0.95] ${quizVerb?.progress.starred ? "bg-amber-50 text-amber-500" : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"}`}><Star className={`h-5 w-5 ${quizVerb?.progress.starred ? "fill-amber-400" : ""}`} /></button>
              <button onClick={() => speakVerb(quizVerb, settings.speechRate)} className="rounded-xl bg-zinc-100 p-3 text-zinc-600 transition-all hover:bg-zinc-200 active:scale-[0.95]"><Volume2 className="h-5 w-5" /></button>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
              <FilterChip active={quizMode === "input"} onClick={() => dispatch({ type: "SET_MODE", value: "input" })}>Ввод</FilterChip>
              <FilterChip active={quizMode === "choice"} onClick={() => dispatch({ type: "SET_MODE", value: "choice" })}>Выбор формы</FilterChip>
              <FilterChip active={quizMode === "translate"} onClick={() => dispatch({ type: "SET_MODE", value: "translate" })}>Перевод</FilterChip>
            </div>

            {quizMode === "input" ? (
              <div className="space-y-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">Past Simple</label>
                  <input value={answerPast} onChange={(e) => dispatch({ type: "SET_ANSWER_PAST", value: e.target.value })} onKeyDown={handleQuizKeyDown} disabled={Boolean(feedback)} placeholder="Например: went" className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 outline-none transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-400 disabled:opacity-60" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">Past Participle</label>
                  <input value={answerPP} onChange={(e) => dispatch({ type: "SET_ANSWER_PP", value: e.target.value })} onKeyDown={handleQuizKeyDown} disabled={Boolean(feedback)} placeholder="Например: gone" className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 outline-none transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-400 disabled:opacity-60" />
                </div>
              </div>
            ) : quizMode === "choice" ? (
              <div>
                <div className="mb-1 text-sm font-medium text-zinc-700">{choiceQuestion.title}</div>
                <div className="mb-3 text-xs text-zinc-400">Варианты похожи между собой, чтобы угадывать было сложнее.</div>
                <div className="flex flex-col gap-2">
                  {choiceQuestion.options.map((option, i) => {
                    const isSelected = choiceSelected === option;
                    const showResult = Boolean(feedback);
                    const isCorrectOpt = option === choiceQuestion.correct;
                    const isWrongSelected = showResult && isSelected && !isCorrectOpt;
                    const optionClass = showResult
                      ? isCorrectOpt
                        ? "border-emerald-400 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-400"
                        : isWrongSelected
                          ? "border-red-400 bg-red-50 text-red-800 ring-1 ring-red-400"
                          : "border-zinc-100 bg-zinc-50 text-zinc-300 opacity-60"
                      : isSelected
                        ? "border-blue-400 bg-blue-50 ring-1 ring-blue-400 text-zinc-800"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-blue-300";
                    return (
                      <button key={option} onClick={() => dispatch({ type: "SET_CHOICE_SELECTED", value: option })} disabled={Boolean(feedback)} className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-all ${optionClass}`}>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-600 shrink-0">{String.fromCharCode(65 + i)}</span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-1 text-sm font-medium text-zinc-700">{translateQuestion.direction === "en-ru" ? "Выбери правильный перевод" : "Выбери английское слово"}</div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-2xl font-bold text-zinc-900">{translateQuestion.word}</span>
                  <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">{translateQuestion.direction === "en-ru" ? "en → ru" : "ru → en"}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {translateQuestion.options.map((option, i) => {
                    const isSelected = translateSelected === option;
                    const showResult = Boolean(feedback) && feedback.mode === "translate";
                    const isCorrectOption = option === translateQuestion.correct;
                    const isWrongSelected = showResult && isSelected && !isCorrectOption;
                    const optionClass = showResult
                      ? isCorrectOption
                        ? "border-emerald-400 bg-emerald-50 text-emerald-800 ring-1 ring-emerald-400"
                        : isWrongSelected
                          ? "border-red-400 bg-red-50 text-red-800 ring-1 ring-red-400"
                          : "border-zinc-100 bg-zinc-50 text-zinc-300 opacity-60"
                      : isSelected
                        ? "border-blue-400 bg-blue-50 ring-1 ring-blue-400 text-zinc-800"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-blue-300";
                    return (
                      <button key={option} onClick={() => dispatch({ type: "SET_TRANSLATE_SELECTED", value: option })} disabled={Boolean(feedback)} className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-all ${optionClass}`}>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-600 shrink-0">{String.fromCharCode(65 + i)}</span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {feedback ? null : (
            <div className="mt-4">
              <button
                type="button"
                onClick={submitQuiz}
                disabled={(quizMode === "choice" && (!choiceSelected || choiceQuestion.verbBase !== quizVerb?.base)) || (quizMode === "translate" && !translateSelected)}
                className="w-full rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 active:scale-[0.98] disabled:opacity-40 disabled:hover:bg-blue-500"
              >
                Проверить
              </button>
            </div>
          )}

          {feedback ? (
            <div className="mt-4">
              <div className={`rounded-xl p-4 ${feedback.success ? "bg-emerald-50 border border-emerald-200" : "bg-rose-50 border border-rose-200"}`}>
                <div className={`font-semibold ${feedback.success ? "text-emerald-800" : "text-rose-800"}`}>{feedback.success ? "✓ Верно!" : "✗ Есть ошибки"}</div>
                <div className="mt-2 rounded-lg bg-white p-3 text-sm text-zinc-700">
                  <div className="font-medium text-zinc-500 text-xs uppercase tracking-wider">Правильные формы</div>
                  <div className="mt-1 text-base"><span className="font-semibold">{quizVerb?.base}</span> — <span className="font-semibold">{quizVerb?.past}</span> — <span className="font-semibold">{quizVerb?.pp}</span></div>
                  <button onClick={() => speakAllForms(quizVerb, settings.speechRate)} className="mt-2 flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1.5 text-sm text-zinc-600 transition-all hover:bg-zinc-200 active:scale-[0.98]"><Volume2 className="h-3.5 w-3.5" />Озвучить</button>
                </div>
                {feedback.mode === "input" ? (
                  <div className="mt-3 space-y-2">
                    <div className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${feedback.okPast ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
                      <div>
                        <span className="font-medium">Past Simple: </span>
                        {feedback.okPast ? (
                          <span>{feedback.userPast} ✓</span>
                        ) : (
                          <span><s className="text-rose-400">{feedback.userPast || "(пусто)"}</s> → <span className="font-semibold">{quizVerb?.past}</span></span>
                        )}
                      </div>
                    </div>
                    <div className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${feedback.okPP ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>
                      <div>
                        <span className="font-medium">Past Participle: </span>
                        {feedback.okPP ? (
                          <span>{feedback.userPP} ✓</span>
                        ) : (
                          <span><s className="text-rose-400">{feedback.userPP || "(пусто)"}</s> → <span className="font-semibold">{quizVerb?.pp}</span></span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : feedback.mode === "translate" ? (
                  <div className="mt-2 text-sm text-slate-500">
                    {feedback.direction === "en-ru" ? `${quizVerb?.base} → ${quizVerb?.ru}` : `${quizVerb?.ru} → ${quizVerb?.base}`}
                    {!feedback.success ? <span> · Твой ответ: {feedback.selected}</span> : null}
                  </div>
                ) : (
                  <div className="mt-2 text-sm text-slate-500">Твой выбор: {feedback.selected}</div>
                )}
                <button type="button" onClick={nextQuiz} className="mt-4 w-full rounded-xl bg-zinc-800 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-900 active:scale-[0.98]">{feedback.success ? "Следующий →" : "Понятно, дальше →"}</button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <StatCard icon={Brain} label="Вопросов" value={session.total} />
          <StatCard icon={CheckCircle2} label="Верно" value={session.correct} />
          <StatCard icon={Trophy} label="Точность" value={`${sessionAccuracy}%`} />
        </div>
      </div>
    </div>
  );
}
