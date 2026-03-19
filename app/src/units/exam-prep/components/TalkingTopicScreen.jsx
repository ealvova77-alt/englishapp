import useTalkingTopic from "../hooks/useTalkingTopic";

const PACK_GUIDES = {
  easy: {
    title: "Easy speaking plan",
    frame: "Start with a direct answer, add one reason, and finish with a personal example.",
  },
  medium: {
    title: "Medium speaking plan",
    frame: "Answer clearly, compare two ideas, and add one real-life situation or example.",
  },
  advanced: {
    title: "Advanced speaking plan",
    frame: "Give a point of view, explain causes or effects, and add a balanced conclusion.",
  },
  debate: {
    title: "Debate speaking plan",
    frame: "State your position, mention the strongest counterargument, and defend your final view.",
  },
};

function TopicMetaPill({ children }) {
  return (
    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
      {children}
    </span>
  );
}

function VocabularyCard({ item }) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2">
        <div className="text-base font-semibold text-zinc-900">{item.term}</div>
        <p className="text-sm leading-relaxed text-zinc-600">{item.meaning}</p>
        {item.example ? (
          <div className="rounded-xl bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-700">
            Example: {item.example}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function TalkingTopicScreen({ topicId }) {
  const { topic, isLoading, error } = useTalkingTopic(topicId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 pt-4">
        <div className="h-8 w-48 animate-pulse rounded-full bg-zinc-200" />
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="h-7 w-64 animate-pulse rounded bg-zinc-200" />
          <div className="mt-3 h-4 w-full animate-pulse rounded bg-zinc-100" />
          <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-zinc-100" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        This speaking topic could not be loaded.
      </div>
    );
  }

  if (!topic) {
    return null;
  }

  const guide = PACK_GUIDES[topic.packId] ?? PACK_GUIDES.medium;
  const vocabulary = Array.isArray(topic.vocabulary) ? topic.vocabulary : [];

  return (
    <div className="flex flex-col gap-5 pt-4">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <TopicMetaPill>{topic.packTitle}</TopicMetaPill>
          <TopicMetaPill>{topic.theme}</TopicMetaPill>
          <TopicMetaPill>{topic.questionCount} questions</TopicMetaPill>
        </div>

        <h2 className="mt-4 text-2xl font-bold text-zinc-900">{topic.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
          {guide.title}: {guide.frame}
        </p>
      </div>

      {vocabulary.length ? (
        <details
          open
          className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">Useful vocabulary</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                Use 1-2 of these words or phrases to make your answer sound more natural.
              </p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              {vocabulary.length} items
            </span>
          </summary>

          <div className="mt-4 grid gap-3">
            {vocabulary.map((item) => (
              <VocabularyCard key={`${topic.id}-${item.term}`} item={item} />
            ))}
          </div>
        </details>
      ) : null}

      <div className="grid gap-3">
        {topic.questions.map((question, index) => (
          <article
            key={`${topic.id}-${index + 1}`}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                {index + 1}
              </span>
              <p className="text-sm leading-relaxed text-zinc-800">{question}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
