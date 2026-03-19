import { useEffect, useMemo, useState } from "react";

const sharedVocabularyModules = import.meta.glob("../data/talking/vocabulary/shared/*.json");

const sharedVocabularyLoaders = Object.fromEntries(
  Object.entries(sharedVocabularyModules).map(([path, loader]) => {
    const id = path.split("/").pop().replace(".json", "");
    return [id, loader];
  })
);

export default function useTalkingSharedVocabulary(sharedVocabularyIds) {
  const ids = useMemo(
    () =>
      Array.isArray(sharedVocabularyIds)
        ? [...new Set(sharedVocabularyIds.filter(Boolean))]
        : [],
    [sharedVocabularyIds]
  );
  const missingId = ids.find((id) => !sharedVocabularyLoaders[id]) ?? null;
  const [sharedSets, setSharedSets] = useState([]);
  const [loadError, setLoadError] = useState(null);
  const [resolvedKey, setResolvedKey] = useState("");

  useEffect(() => {
    if (!ids.length || missingId) {
      return undefined;
    }

    const loaders = ids.map((id) => sharedVocabularyLoaders[id]);

    let isCancelled = false;
    const requestKey = ids.join("|");

    Promise.all(loaders.map((loader) => loader()))
      .then((modules) => {
        if (isCancelled) {
          return;
        }

        const loadedSets = modules.map((module) => module.default ?? module);
        setSharedSets(loadedSets);
        setLoadError(null);
        setResolvedKey(requestKey);
      })
      .catch((error) => {
        if (isCancelled) {
          return;
        }

        setSharedSets([]);
        setLoadError(error);
        setResolvedKey(requestKey);
      });

    return () => {
      isCancelled = true;
    };
  }, [ids, missingId]);

  const requestKey = ids.join("|");
  const hasResolvedCurrentIds = resolvedKey === requestKey;
  const derivedError = missingId ? new Error(`Unknown shared vocabulary set: ${missingId}`) : null;

  return {
    sharedSets: ids.length > 0 && hasResolvedCurrentIds && !loadError ? sharedSets : [],
    isLoading: ids.length > 0 && !missingId && !hasResolvedCurrentIds,
    error: derivedError ?? (ids.length > 0 && hasResolvedCurrentIds ? loadError : null),
  };
}
