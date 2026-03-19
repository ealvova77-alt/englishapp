import { useReducer, useMemo, useEffect, useCallback } from "react";
import { isCorrect } from "../../../shared/utils/string";
import { buildChoiceQuestion, buildTranslateQuestion } from "./quiz";

const initialState = {
  filter: "hard",
  mode: "input",
  verbBase: null,
  answerPast: "",
  answerPP: "",
  choiceSelected: "",
  choiceQuestion: { type: "pair", title: "Выбери обе формы", correct: "", options: [], verbBase: "" },
  translateSelected: "",
  translateQuestion: { direction: "en-ru", word: "", correct: "", options: [], verbBase: "" },
  feedback: null,
  session: { correct: 0, total: 0 },
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, filter: action.value };
    case "SET_MODE":
      return {
        ...state,
        mode: action.value,
        feedback: null,
        answerPast: "",
        answerPP: "",
        choiceSelected: "",
        translateSelected: "",
      };
    case "SET_ANSWER_PAST":
      return { ...state, answerPast: action.value };
    case "SET_ANSWER_PP":
      return { ...state, answerPP: action.value };
    case "SET_CHOICE_SELECTED":
      return { ...state, choiceSelected: action.value };
    case "SET_TRANSLATE_SELECTED":
      return { ...state, translateSelected: action.value };
    case "SET_CHOICE_QUESTION":
      return { ...state, choiceQuestion: action.value, choiceSelected: "", feedback: null };
    case "SET_TRANSLATE_QUESTION":
      return { ...state, translateQuestion: action.value, translateSelected: "", feedback: null };
    case "SET_FEEDBACK":
      return { ...state, feedback: action.value };
    case "RECORD_SESSION":
      return {
        ...state,
        session: {
          correct: state.session.correct + (action.success ? 1 : 0),
          total: state.session.total + 1,
        },
      };
    case "NEXT": {
      return {
        ...state,
        verbBase: action.verbBase,
        answerPast: "",
        answerPP: "",
        choiceSelected: "",
        translateSelected: "",
        feedback: null,
      };
    }
    case "SET_VERB_BASE":
      return { ...state, verbBase: action.value };
    case "RESET_SESSION":
      return { ...state, session: { correct: 0, total: 0 }, feedback: null, answerPast: "", answerPP: "" };
    default:
      return state;
  }
}

export default function useQuiz(enrichedVerbs, updateProgress, registerStudyActivity, todayKey) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const quizPool = useMemo(() => {
    const all = enrichedVerbs;
    const hard = all.filter((v) => v.difficulty === "hard");
    const unlearned = all.filter((v) => !v.progress.known);
    const starred = all.filter((v) => v.progress.starred);
    if (state.filter === "hard") return hard.length ? hard : all;
    if (state.filter === "unlearned") return unlearned.length ? unlearned : all;
    if (state.filter === "starred") return starred.length ? starred : all;
    if (["basic", "advanced", "rare"].includes(state.filter)) {
      const level = all.filter((v) => v.level === state.filter);
      return level.length ? level : all;
    }
    if (state.filter === "common") {
      const common = all.filter((v) => v.common);
      return common.length ? common : all;
    }
    return all;
  }, [enrichedVerbs, state.filter]);

  const quizVerb = useMemo(() => {
    return quizPool.find((v) => v.base === state.verbBase) || quizPool[0] || null;
  }, [quizPool, state.verbBase]);

  useEffect(() => {
    if (!quizPool.length) return;
    if (!state.verbBase || !quizPool.some((v) => v.base === state.verbBase)) {
      dispatch({ type: "SET_VERB_BASE", value: quizPool[0].base });
    }
  }, [quizPool, state.verbBase]);

  useEffect(() => {
    if (!quizVerb || state.mode !== "choice") return;
    dispatch({ type: "SET_CHOICE_QUESTION", value: buildChoiceQuestion(quizVerb, quizPool) });
  }, [quizPool, quizVerb, state.mode]);

  useEffect(() => {
    if (!quizVerb || state.mode !== "translate") return;
    dispatch({ type: "SET_TRANSLATE_QUESTION", value: buildTranslateQuestion(quizVerb, quizPool) });
  }, [quizPool, quizVerb, state.mode]);

  const sessionAccuracy = state.session.total ? Math.round((state.session.correct / state.session.total) * 100) : 0;

  const applyQuizResult = useCallback((verb, success) => {
    registerStudyActivity(2);
    dispatch({ type: "RECORD_SESSION", success });
    updateProgress(verb.base, (current) => ({
      ...current,
      known: success ? true : current.known,
      mistaken: !success,
      right: (current.right || 0) + (success ? 1 : 0),
      wrong: (current.wrong || 0) + (success ? 0 : 1),
      reviews: (current.reviews || 0) + 1,
      lastSeen: todayKey,
    }));
  }, [updateProgress, registerStudyActivity, todayKey]);

  const submitQuiz = useCallback(() => {
    if (!quizVerb) return;
    if (state.mode === "translate") {
      if (!state.translateSelected) return;
      const success = state.translateSelected === state.translateQuestion.correct;
      dispatch({ type: "SET_FEEDBACK", value: { mode: "translate", success, selected: state.translateSelected, correct: state.translateQuestion.correct, direction: state.translateQuestion.direction } });
      applyQuizResult(quizVerb, success);
      return;
    }
    if (state.mode === "choice") {
      if (!state.choiceSelected) return;
      const success = state.choiceSelected === state.choiceQuestion.correct;
      dispatch({ type: "SET_FEEDBACK", value: { mode: "choice", success, selected: state.choiceSelected, correct: state.choiceQuestion.correct } });
      applyQuizResult(quizVerb, success);
      return;
    }
    const okPast = isCorrect(state.answerPast, quizVerb.past);
    const okPP = isCorrect(state.answerPP, quizVerb.pp);
    const success = okPast && okPP;
    dispatch({ type: "SET_FEEDBACK", value: { mode: "input", success, okPast, okPP, userPast: state.answerPast, userPP: state.answerPP } });
    applyQuizResult(quizVerb, success);
  }, [quizVerb, state.mode, state.translateSelected, state.translateQuestion, state.choiceSelected, state.choiceQuestion, state.answerPast, state.answerPP, applyQuizResult]);

  const nextQuiz = useCallback(() => {
    const current = state.verbBase;
    const others = quizPool.filter((v) => v.base !== current);
    const pool = others.length ? others : quizPool;

    // Weighted random: mistaken and unseen words appear more often
    const weighted = pool.map((v) => {
      let weight = 1;
      if (v.progress.mistaken) weight += 4;
      if (!v.progress.known) weight += 2;
      if (v.difficulty === "hard") weight += 2;
      if (!v.progress.lastSeen || v.progress.lastSeen !== todayKey) weight += 1;
      return { verb: v, weight };
    });

    const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);
    let rand = Math.random() * totalWeight;
    let picked = weighted[0].verb;
    for (const w of weighted) {
      rand -= w.weight;
      if (rand <= 0) { picked = w.verb; break; }
    }

    dispatch({ type: "NEXT", verbBase: picked.base });
  }, [state.verbBase, quizPool, todayKey]);

  const handleQuizKeyDown = useCallback((event) => {
    if (event.key !== "Enter") return;
    if (state.feedback) { nextQuiz(); return; }
    if (state.mode === "input") submitQuiz();
  }, [state.feedback, state.mode, nextQuiz, submitQuiz]);

  return {
    quizState: state,
    dispatch,
    quizPool,
    quizVerb,
    sessionAccuracy,
    submitQuiz,
    nextQuiz,
    handleQuizKeyDown,
  };
}
