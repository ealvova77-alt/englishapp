import test from "node:test";
import assert from "node:assert/strict";

import { safeParse, localDateKey, previousDateKey } from "../src/shared/utils/storage.js";
import { getDefaultProgressRecord, getDifficulty } from "../src/shared/utils/progress.js";
import { normalize, primaryVariant, isCorrect } from "../src/shared/utils/string.js";

test("safeParse returns parsed JSON when input is valid", () => {
  assert.deepEqual(safeParse('{"known":true}', {}), { known: true });
});

test("safeParse returns fallback when input is invalid", () => {
  const fallback = { known: false };
  assert.equal(safeParse("{bad json", fallback), fallback);
});

test("localDateKey and previousDateKey produce stable YYYY-MM-DD values", () => {
  const date = new Date("2026-03-19T09:30:00Z");
  assert.equal(localDateKey(date), "2026-03-19");
  assert.equal(previousDateKey("2026-03-19"), "2026-03-18");
});

test("getDefaultProgressRecord returns an empty progress shape", () => {
  assert.deepEqual(getDefaultProgressRecord(), {
    starred: false,
    known: false,
    mistaken: false,
    right: 0,
    wrong: 0,
    reviews: 0,
    lastSeen: null,
  });
});

test("getDifficulty marks hard and easy records correctly", () => {
  assert.equal(getDifficulty({ right: 0, wrong: 4 }), "hard");
  assert.equal(getDifficulty({ right: 3, wrong: 0 }), "easy");
  assert.equal(getDifficulty({ right: 1, wrong: 1 }), "normal");
});

test("string helpers normalize variants and validate alternate answers", () => {
  assert.equal(normalize("  Went, Gone "), "went/gone");
  assert.equal(primaryVariant("went/gone"), "went");
  assert.equal(isCorrect("learnt", "learned/learnt"), true);
  assert.equal(isCorrect("went/gone", "went/gone"), true);
  assert.equal(isCorrect("gone", "went/gone"), true);
  assert.equal(isCorrect("walked", "went/gone"), false);
});
