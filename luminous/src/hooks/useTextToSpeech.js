import { useRef } from 'react';

export default function useTextToSpeech({ lang = 'en-US', rate = 1, pitch = 1 } = {}) {
  const utteranceRef = useRef(null);

  const speak = (text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('Text-to-Speech not supported.');
      return;
    }
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  };

  return { speak, stop };
}
