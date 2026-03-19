import { useEffect, useRef } from "react";

export default function QuizCard({
  question,
  currentIndex,
  total,
  isAnswered,
  selectedAnswer,
  setSelectedAnswer,
  typedAnswer,
  setTypedAnswer,
  onCheck,
  onNext,
  isLast,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (question.type === "fill" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [question, currentIndex]);

  const isCorrect =
    isAnswered &&
    (question.type === "choice"
      ? selectedAnswer === question.answer
      : question.accept
      ? question.accept.some((a) => a.toLowerCase() === typedAnswer.trim().toLowerCase())
      : typedAnswer.trim().toLowerCase() === question.answer.toLowerCase());

  return (
    <div className="flex flex-col gap-5">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
        <span className="text-xs font-medium text-zinc-500 whitespace-nowrap">
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm p-5">
        <p className="text-base text-zinc-800 whitespace-pre-line leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Answers */}
      {question.type === "choice" ? (
        <div className="flex flex-col gap-2">
          {question.options.map((option, i) => {
            let style = "border-zinc-200 bg-white hover:border-blue-300";
            if (isAnswered) {
              if (i === question.answer) {
                style = "border-emerald-400 bg-emerald-50 ring-1 ring-emerald-400";
              } else if (i === selectedAnswer && !isCorrect) {
                style = "border-red-400 bg-red-50 ring-1 ring-red-400";
              } else {
                style = "border-zinc-100 bg-zinc-50 opacity-60";
              }
            } else if (i === selectedAnswer) {
              style = "border-blue-400 bg-blue-50 ring-1 ring-blue-400";
            }

            return (
              <button
                key={i}
                onClick={() => !isAnswered && setSelectedAnswer(i)}
                disabled={isAnswered}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${style}`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-600 shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm text-zinc-800">{option}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div>
          <input
            ref={inputRef}
            type="text"
            value={typedAnswer}
            onChange={(e) => !isAnswered && setTypedAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isAnswered && typedAnswer.trim()) onCheck();
              if (e.key === "Enter" && isAnswered) onNext();
            }}
            disabled={isAnswered}
            placeholder="Type your answer..."
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all ${
              isAnswered
                ? isCorrect
                  ? "border-emerald-400 bg-emerald-50"
                  : "border-red-400 bg-red-50"
                : "border-zinc-200 bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            }`}
          />
          {isAnswered && !isCorrect && (
            <p className="mt-2 text-sm text-emerald-700 font-medium">
              Correct answer: {question.answer}
            </p>
          )}
        </div>
      )}

      {/* Explanation */}
      {isAnswered && question.explanation && (
        <div className={`rounded-xl px-4 py-3 text-sm ${
          isCorrect ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"
        }`}>
          {isCorrect ? "✓ " : "✗ "}
          {question.explanation}
        </div>
      )}

      {/* Action button */}
      <div>
        {!isAnswered ? (
          <button
            onClick={onCheck}
            disabled={question.type === "choice" ? selectedAnswer === null : !typedAnswer.trim()}
            className="w-full rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 active:scale-[0.98] disabled:opacity-40 disabled:hover:bg-blue-500"
          >
            Check
          </button>
        ) : (
          <button
            onClick={onNext}
            className="w-full rounded-xl bg-zinc-800 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-900 active:scale-[0.98]"
          >
            {isLast ? "See Results" : "Next →"}
          </button>
        )}
      </div>
    </div>
  );
}
