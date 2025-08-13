// lib/tts.js
export function speak(text) {
  if (typeof window === "undefined") return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
}
