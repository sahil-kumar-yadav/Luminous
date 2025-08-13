"use client";
import { useEffect, useRef, useState } from "react";
import { createModel } from "vosk-browser";

export default function useVosk({ onResult, onPartial, onError }) {
  const recognizerRef = useRef(null);
  const [listening, setListening] = useState(false);
  const audioCtxRef = useRef(null);
  const procRef = useRef(null);

  useEffect(() => {
    async function init() {
      try {
        console.log("Loading Vosk model...");
        const model = await createModel("/models/vosk/vosk-model-small-en-us-0.15.tar.gz");
        const recognizer = new model.KaldiRecognizer(16000);
        recognizer.on("result", (msg) => onResult?.(msg.result.text));
        recognizer.on("partialresult", (msg) => onPartial?.(msg.result.partial));
        recognizerRef.current = recognizer;
        console.log("Model loaded.");
      } catch (err) {
        console.error("Vosk init error:", err);
        onError?.(err);
      }
    }
    init();
  }, [onResult, onPartial, onError]);

  const start = async () => {
    if (!recognizerRef.current) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioCtxRef.current = new AudioContext({ sampleRate: 16000 });
    const source = audioCtxRef.current.createMediaStreamSource(stream);
    procRef.current = audioCtxRef.current.createScriptProcessor(4096, 1, 1);
    procRef.current.onaudioprocess = (e) => {
      recognizerRef.current.acceptWaveform(e.inputBuffer);
    };
    source.connect(procRef.current);
    procRef.current.connect(audioCtxRef.current.destination);
    setListening(true);
  };

  const stop = () => {
    procRef.current?.disconnect();
    audioCtxRef.current?.close();
    setListening(false);
  };

  return { start, stop, listening };
}
