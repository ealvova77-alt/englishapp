export function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/,/g, "/");
}

export function primaryVariant(value) {
  return String(value || "").split("/")[0];
}

export function isCorrect(answer, target) {
  const variants = String(target)
    .split("/")
    .map((item) => normalize(item))
    .filter(Boolean);
  const answers = normalize(answer)
    .split("/")
    .map((a) => a.trim())
    .filter(Boolean);
  return answers.length > 0 && answers.every((a) => variants.includes(a));
}

export function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
