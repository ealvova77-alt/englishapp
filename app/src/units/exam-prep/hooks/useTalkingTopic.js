import { useEffect, useState } from "react";

const topicModules = import.meta.glob("../data/talking/topics/*.json");

const topicLoaders = Object.fromEntries(
  Object.entries(topicModules).map(([path, loader]) => {
    const id = path.split("/").pop().replace(".json", "");
    return [id, loader];
  })
);

export default function useTalkingTopic(topicId) {
  const [loadedTopic, setLoadedTopic] = useState(null);
  const [loadedTopicId, setLoadedTopicId] = useState(null);
  const [loadError, setLoadError] = useState(null);

  const loadTopic = topicId ? topicLoaders[topicId] : null;

  useEffect(() => {
    if (!loadTopic) {
      return undefined;
    }

    let isCancelled = false;

    loadTopic()
      .then((module) => {
        if (isCancelled) {
          return;
        }

        setLoadedTopic(module.default ?? module);
        setLoadedTopicId(topicId);
        setLoadError(null);
      })
      .catch((error) => {
        if (isCancelled) {
          return;
        }

        setLoadedTopic(null);
        setLoadedTopicId(topicId);
        setLoadError(error);
      });

    return () => {
      isCancelled = true;
    };
  }, [loadTopic, topicId]);

  if (!topicId) {
    return {
      topic: null,
      isLoading: false,
      error: null,
    };
  }

  if (!loadTopic) {
    return {
      topic: null,
      isLoading: false,
      error: new Error(`Unknown talking topic: ${topicId}`),
    };
  }

  const hasResolvedCurrentTopic = loadedTopicId === topicId;

  return {
    topic: hasResolvedCurrentTopic && !loadError ? loadedTopic : null,
    isLoading: !hasResolvedCurrentTopic,
    error: hasResolvedCurrentTopic ? loadError : null,
  };
}
