export function getDefaultProgressRecord() {
  return { starred: false, known: false, mistaken: false, right: 0, wrong: 0, reviews: 0, lastSeen: null };
}

export function getDifficulty(record) {
  const wrong = record?.wrong || 0;
  const right = record?.right || 0;
  if (wrong >= 4 || wrong > right) return "hard";
  if (right >= 3 && wrong === 0) return "easy";
  return "normal";
}
