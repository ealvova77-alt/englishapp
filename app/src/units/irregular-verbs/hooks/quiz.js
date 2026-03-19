import { VERB_EXAMPLES } from "../data/verbExamples";
import { primaryVariant, shuffle } from "../../../shared/utils/string";

export function getVerbExamples(verb) {
  const ex = VERB_EXAMPLES[verb?.base];
  if (ex) return ex;
  const base = primaryVariant(verb?.base || "");
  const past = primaryVariant(verb?.past || "");
  const pp = primaryVariant(verb?.pp || "");
  return {
    base: `I need to ${base} this.`,
    past: `Yesterday, I ${past}.`,
    perfect: `I have ${pp} this before.`,
  };
}

export function buildTenseExamples(verb) {
  const ex = getVerbExamples(verb);
  return [
    ["Infinitive", ex.base],
    ["Past Simple", ex.past],
    ["Present Perfect", ex.perfect],
  ];
}

export function buildChoiceQuestion(verb, pool) {
  const types = [
    { key: "past", title: "Выбери Past Simple" },
    { key: "pp", title: "Выбери Past Participle" },
    { key: "pair", title: "Выбери обе формы" },
  ];
  const type = types[Math.floor(Math.random() * types.length)];
  const correct =
    type.key === "past"
      ? primaryVariant(verb.past)
      : type.key === "pp"
        ? primaryVariant(verb.pp)
        : `${primaryVariant(verb.past)} · ${primaryVariant(verb.pp)}`;

  const distractors = shuffle(
    pool
      .filter((item) => item.base !== verb.base)
      .map((item) =>
        type.key === "past"
          ? primaryVariant(item.past)
          : type.key === "pp"
            ? primaryVariant(item.pp)
            : `${primaryVariant(item.past)} · ${primaryVariant(item.pp)}`
      )
      .filter((item, index, arr) => item !== correct && arr.indexOf(item) === index)
  ).slice(0, 3);

  return {
    type: type.key,
    title: type.title,
    correct,
    options: shuffle([correct, ...distractors]),
    verbBase: verb.base,
  };
}

export function buildTranslateQuestion(verb, pool) {
  const direction = Math.random() < 0.5 ? "en-ru" : "ru-en";
  if (direction === "en-ru") {
    const correct = verb.ru;
    const distractors = shuffle(
      pool
        .filter((v) => v.base !== verb.base && v.ru !== verb.ru)
        .map((v) => v.ru)
        .filter((v, i, arr) => arr.indexOf(v) === i)
    ).slice(0, 3);
    return { direction, word: verb.base, correct, options: shuffle([correct, ...distractors]), verbBase: verb.base };
  }
  const correct = verb.base;
  const distractors = shuffle(
    pool
      .filter((v) => v.base !== verb.base)
      .map((v) => v.base)
      .filter((v, i, arr) => arr.indexOf(v) === i)
  ).slice(0, 3);
  return { direction, word: verb.ru, correct, options: shuffle([correct, ...distractors]), verbBase: verb.base };
}
