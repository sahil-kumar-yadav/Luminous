// hooks/useVoskSpeech.js
import { useEffect, useRef } from "react";
import { Model, KaldiRecognizer } from "vosk-browser";

export default function useVoskSpeech({ onResult, onError }) {
  const modelRef = useRef(null);
  const recognizerRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    async function initVosk() {
      try {
        console.log("Loading Vosk model...");
        modelRef.current = new Model("/models/vosk-model-small-en-us-0.15");
        await modelRef.current.ready;
        console.log("Model loaded");

        recognizerRef.current = new KaldiRecognizer(modelRef.current, 16000);
        recognizerRef.current.setWords(true);

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const processor = audioContext.createScriptProcessor(4096, 1, 1);

        processor.onaudioprocess = (e) => {
          recognizerRef.current.acceptWaveform(e.inputBuffer.getChannelData(0));
          const result = recognizerRef.current.result();
          if (result?.text) {
            console.log("Heard:", result.text);
            if (onResult) onResult(result.text);
          }
        };

        source.connect(processor);
        processor.connect(audioContext.destination);
      } catch (err) {
        console.error("Vosk init error", err);
        if (onError) onError(err);
      }
    }

    initVosk();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [onResult, onError]);

  return null; // hook doesn't render UI
}
