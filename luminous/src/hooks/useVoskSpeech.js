"use client";
import { useEffect, useRef, useState } from "react";

export default function useVoskSpeech({ onResult, onError }) {
  const recognizerRef = useRef(null);
  const [listening, setListening] = useState(false);
  const audioCtxRef = useRef(null);
  const processorRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    let voskModule;

    async function initVosk() {
      try {
        // Load vosk.js dynamically
        voskModule = await import(
          /* webpackIgnore: true */ "/vosk/vosk.js"
        );

        // Init WASM runtime
        const Vosk = await voskModule.default({
          locateFile: (path) => `/vosk/${path}`,
        });

        // Load model
        const model = new Vosk.Model("/models/vosk");
        const recognizer = new model.Recognizer(16000);
        recognizerRef.current = recognizer;

        console.log("Vosk model loaded");
      } catch (err) {
        console.error("Vosk init error", err);
        if (onError) onError(err);
      }
    }

    initVosk();

    return () => {
      stop();
      recognizerRef.current = null;
    };
  }, []);

  async function start() {
    if (!recognizerRef.current) {
      console.warn("Recognizer not ready yet");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioCtxRef.current = new AudioContext({ sampleRate: 16000 });
      sourceRef.current = audioCtxRef.current.createMediaStreamSource(stream);
      processorRef.current = audioCtxRef.current.createScriptProcessor(4096, 1, 1);

      processorRef.current.onaudioprocess = (event) => {
        const inputData = event.inputBuffer.getChannelData(0);
        const int16Data = floatTo16BitPCM(inputData);

        if (recognizerRef.current.acceptWaveform(int16Data)) {
          const res = recognizerRef.current.result();
          if (res?.text && onResult) onResult(res.text);
        } else {
          const partial = recognizerRef.current.partialResult();
          if (partial?.partial && onResult) onResult(partial.partial);
        }
      };

      sourceRef.current.connect(processorRef.current);
      processorRef.current.connect(audioCtxRef.current.destination);

      setListening(true);
    } catch (err) {
      console.error("Mic error", err);
      if (onError) onError(err);
    }
  }

  function stop() {
    processorRef.current?.disconnect();
    sourceRef.current?.disconnect();
    audioCtxRef.current?.close();
    setListening(false);
  }

  return { start, stop, listening };
}

function floatTo16BitPCM(float32Array) {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  let offset = 0;
  for (let i = 0; i < float32Array.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return buffer;
}
