export default function ResultScreen({ results, onRestart, onBack, stats }) {
  const correct = results.filter((r) => r.isCorrect).length;
  const total = results.length;
  const pct = Math.round((correct / total) * 100);

  const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "👏" : pct >= 50 ? "💪" : "📚";
  const message =
    pct >= 90
      ? "Excellent!"
      : pct >= 70
      ? "Good job!"
      : pct >= 50
      ? "Not bad, keep practicing!"
      : "Keep studying, you'll improve!";

  return (
    <div className="flex flex-col items-center gap-6 pt-8">
      {/* Score circle */}
      <div className="relative flex h-36 w-36 items-center justify-center">
        <svg className="absolute inset-0" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="44"
            fill="none" stroke="#e4e4e7" strokeWidth="8"
          />
          <circle
            cx="50" cy="50" r="44"
            fill="none"
            stroke={pct >= 70 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${pct * 2.76} 276`}
            transform="rotate(-90 50 50)"
            className="transition-all duration-700"
          />
        </svg>
        <div className="text-center">
          <div className="text-3xl font-bold text-zinc-800">{pct}%</div>
          <div className="text-xs text-zinc-500">{correct}/{total}</div>
        </div>
      </div>

      <div className="text-center">
        <div className="text-4xl mb-2">{emoji}</div>
        <h3 className="text-xl font-bold text-zinc-800">{message}</h3>
      </div>

      {/* All-time stats */}
      {stats.total > 0 && (
        <div className="w-full rounded-xl bg-zinc-50 border border-zinc-200 p-4">
          <p className="text-xs text-zinc-500 mb-2 font-medium">All-time stats for this section</p>
          <div className="flex justify-between text-sm text-zinc-700">
            <span>Questions answered: {stats.total}</span>
            <span>Accuracy: {Math.round((stats.correct / stats.total) * 100)}%</span>
          </div>
        </div>
      )}

      {/* Mistakes review */}
      {results.some((r) => !r.isCorrect) && (
        <div className="w-full">
          <h4 className="text-sm font-semibold text-zinc-600 mb-2 px-1">Review mistakes:</h4>
          <div className="flex flex-col gap-2">
            {results
              .filter((r) => !r.isCorrect)
              .map((r, i) => (
                <div key={i} className="rounded-xl border border-red-100 bg-red-50 p-3">
                  <p className="text-sm text-zinc-700 mb-1">{r.question.question}</p>
                  <p className="text-xs text-emerald-700 font-medium">
                    Answer: {r.question.type === "choice"
                      ? r.question.options[r.question.answer]
                      : r.question.answer}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex w-full gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 rounded-xl border border-zinc-200 bg-white py-3 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-50 active:scale-[0.98]"
        >
          Topics
        </button>
        <button
          onClick={onRestart}
          className="flex-1 rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 active:scale-[0.98]"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
