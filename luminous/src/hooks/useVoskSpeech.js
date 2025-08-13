// src/hooks/useVoskSpeech.js
"use client";
import { useEffect, useRef, useState } from "react";
import * as vosk from "vosk-browser";

export default function useVoskSpeech({ onResult, onError }) {
  const [listening, setListening] = useState(false);
  const recognizerRef = useRef(null);
  const mediaStreamRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function initVosk() {
      try {
        console.log("Loading Vosk model...");
        const model = await vosk.Model.load("/models/vosk");
        console.log("Model loaded");

        // ✅ Correct recognizer constructor for vosk-browser
        const recognizer = new vosk.KaldiRecognizer(model, 16000);
        recognizerRef.current = recognizer;
      } catch (err) {
        console.error("Vosk init error", err);
        if (onError) onError(err);
        // Fall back to Web Speech API if available
        initWebSpeechFallback();
      }
    }

    function initWebSpeechFallback() {
      if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
        console.error("No speech recognition available");
        return;
      }
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        if (onResult) onResult(transcript);
      };
      recognition.onerror = (event) => {
        if (onError) onError(event.error);
      };
      recognizerRef.current = { start: () => recognition.start(), stop: () => recognition.stop() };
    }

    initVosk();
    return () => {
      cancelled = true;
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function start() {
    if (!recognizerRef.current) return;
    setListening(true);

    try {
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext({ sampleRate: 16000 });
      const source = audioContext.createMediaStreamSource(mediaStreamRef.current);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        recognizerRef.current.acceptWaveform(inputData);
        const result = recognizerRef.current.result();
        if (result && result.text && onResult) {
          onResult(result.text);
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);
    } catch (err) {
      console.error("Error starting mic", err);
      if (onError) onError(err);
    }
  }

  function stop() {
    setListening(false);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
  }

  return { start, stop, listening };
}
