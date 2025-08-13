import { useState, useEffect, useRef } from 'react';

export default function useSpeechRecognition({ onResult, onError, lang = 'en-US' } = {}) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('SpeechRecognition API not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = lang;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('')
        .trim();
      if (onResult) onResult(transcript);
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        console.warn('No speech detected — try speaking again.');
        return;
      }
      if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please allow it in your browser.');
      }
      console.error('Speech recognition error', event.error);
      if (onError) onError(event.error);
    };


    recognitionRef.current = recognition;
  }, [lang, onResult, onError]);

  const start = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const stop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  return { listening, start, stop };
}
