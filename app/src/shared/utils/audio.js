import { primaryVariant } from "./string";

export function speakText(text, speed = 0.95) {
  if (typeof window === "undefined" || !window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = speed;
  window.speechSynthesis.speak(utterance);
}

export function speakVerb(verb, speed = 0.95) {
  if (!verb) return;
  speakText(primaryVariant(verb.base), speed);
}

export function speakAllForms(verb, speed = 0.95) {
  if (!verb) return;
  speakText(`${primaryVariant(verb.base)}. ${primaryVariant(verb.past)}. ${primaryVariant(verb.pp)}`, speed);
}
