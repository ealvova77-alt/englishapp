import { useMemo, useState } from "react";
import FilterChip from "../../../shared/components/ui/FilterChip";

function PackCard({ pack, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition-all ${
        active
          ? "border-blue-400 bg-blue-50 shadow-sm"
          : "border-zinc-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-md active:scale-[0.98]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-zinc-900">{pack.title}</h3>
          <p className="mt-1 text-sm text-zinc-500">{pack.subtitle}</p>
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-zinc-600">
          {pack.topicCount}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600">{pack.description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-500">
        <span className="rounded-full bg-white px-2.5 py-1">
          {pack.questionCount} questions
        </span>
      </div>
    </button>
  );
}

export default function TalkingTopicList({
  packs,
  topics,
  selectedPackId,
  onSelectPack,
  onOpenTopic,
}) {
  const [search, setSearch] = useState("");
  const [activeTheme, setActiveTheme] = useState("all");

  const activePack = useMemo(
    () => packs.find((pack) => pack.id === selectedPackId) ?? null,
    [packs, selectedPackId]
  );

  const packTopics = useMemo(() => {
    if (!selectedPackId) {
      return [];
    }

    return topics.filter((topic) => topic.packId === selectedPackId);
  }, [selectedPackId, topics]);

  const themeOptions = useMemo(
    () => [...new Set(packTopics.map((topic) => topic.theme))].sort((a, b) => a.localeCompare(b)),
    [packTopics]
  );

  const filteredTopics = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return packTopics.filter((topic) => {
      const matchesTheme = activeTheme === "all" || topic.theme === activeTheme;
      const matchesSearch =
        !normalizedSearch ||
        topic.title.toLowerCase().includes(normalizedSearch) ||
        topic.theme.toLowerCase().includes(normalizedSearch);

      return matchesTheme && matchesSearch;
    });
  }, [activeTheme, packTopics, search]);

  return (
    <div className="flex flex-col gap-5 pt-4">
      <div className="space-y-2 px-1">
        <h2 className="text-xl font-bold text-zinc-800">Speaking Practice</h2>
        <p className="text-sm leading-relaxed text-zinc-500">
          Pick a speaking pack, then open a topic to see the full set of discussion questions.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {packs.map((pack) => (
          <PackCard
            key={pack.id}
            pack={pack}
            active={pack.id === selectedPackId}
            onClick={() => {
              setSearch("");
              setActiveTheme("all");
              onSelectPack(pack.id);
            }}
          />
        ))}
      </div>

      {!activePack ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-500">
          Choose one of the four packs above to browse the imported speaking topics.
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold text-zinc-900">{activePack.title}</h3>
                <p className="text-sm text-zinc-500">{activePack.description}</p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {filteredTopics.length} topics shown
              </span>
            </div>

            <div className="mt-4">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search topics or themes"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              />
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              <FilterChip active={activeTheme === "all"} onClick={() => setActiveTheme("all")}>
                All themes
              </FilterChip>
              {themeOptions.map((theme) => (
                <FilterChip
                  key={theme}
                  active={activeTheme === theme}
                  onClick={() => setActiveTheme(theme)}
                >
                  {theme}
                </FilterChip>
              ))}
            </div>
          </div>

          {filteredTopics.length ? (
            <div className="grid gap-2">
              {filteredTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => onOpenTopic(topic.id, topic.packId)}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-left transition-all hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm active:scale-[0.98]"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-zinc-800">{topic.title}</div>
                    <div className="mt-1 text-xs text-zinc-500">{topic.theme}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                      {topic.questionCount} Qs
                    </span>
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
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500 shadow-sm">
              No topics match the current search and theme filters.
            </div>
          )}
        </>
      )}
    </div>
  );
}
