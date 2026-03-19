import { MessageCircleMore } from "lucide-react";

function ChevronIcon() {
  return (
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
      className="text-zinc-400"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function SpeakingCard({ onOpenSpeaking, speakingSummary }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-start gap-3 p-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
          <MessageCircleMore className="h-6 w-6" />
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-zinc-800">Speaking</h3>
            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-sky-700">
              New
            </span>
          </div>
          <p className="mt-0.5 text-sm text-zinc-500">
            Practice real discussion topics with curated speaking packs and lazy-loaded topic pages.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-4 pb-4">
        <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-600">
          <span className="rounded-full bg-zinc-100 px-3 py-1">
            {speakingSummary.packCount} packs
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1">
            {speakingSummary.topicCount} topics
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1">
            {speakingSummary.questionCount} questions
          </span>
        </div>

        <button
          onClick={onOpenSpeaking}
          className="flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3 text-left transition-all hover:bg-blue-50 hover:shadow-sm active:scale-[0.98]"
        >
          <span className="text-sm font-medium text-zinc-700">Open speaking topics</span>
          <ChevronIcon />
        </button>
      </div>
    </div>
  );
}

export default function TopicList({
  topics,
  onSelect,
  progress,
  onOpenSpeaking,
  speakingSummary,
}) {
  return (
    <div className="flex flex-col gap-4 pt-4">
      <h2 className="px-1 text-xl font-bold text-zinc-800">
        {"\u0412\u044b\u0431\u0435\u0440\u0438 \u0442\u0435\u043c\u0443"}
      </h2>

      {onOpenSpeaking && speakingSummary && (
        <SpeakingCard
          onOpenSpeaking={onOpenSpeaking}
          speakingSummary={speakingSummary}
        />
      )}

      {topics.map((topic) => (
        <div
          key={topic.id}
          className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
        >
          <div className="flex items-start gap-3 p-4">
            <span className="text-3xl">{topic.emoji}</span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-zinc-800">{topic.title}</h3>
              <p className="mt-0.5 text-sm text-zinc-500">{topic.description}</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 px-4 pb-4">
            {topic.sections.map((section) => {
              const key = `${topic.id}__${section.id}`;
              const stat = progress[key];
              const pct = stat ? Math.round((stat.correct / stat.total) * 100) : null;

              return (
                <button
                  key={section.id}
                  onClick={() => onSelect(topic.id, section.id)}
                  className="flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3 text-left transition-all hover:bg-blue-50 hover:shadow-sm active:scale-[0.98]"
                >
                  <span className="text-sm font-medium text-zinc-700">{section.title}</span>
                  <div className="flex items-center gap-2">
                    {pct !== null && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          pct >= 80
                            ? "bg-emerald-100 text-emerald-700"
                            : pct >= 50
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {pct}%
                      </span>
                    )}
                    <ChevronIcon />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
