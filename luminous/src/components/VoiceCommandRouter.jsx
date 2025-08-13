"use client";

import useSpeechRecognition from "@/hooks/useSpeechRecognition";

export default function VoiceCommandRouter({ onCommand }) {
  const commands = ["play", "pause", "next", "previous", "stop"];

  const { start, stop, listening } = useSpeechRecognition({
    phrases: commands,
    lang: "en-US",
    minConfidence: 0.75,
    onResult: (cmd) => {
      console.log("[Command Router] Executing:", cmd);
      onCommand(cmd);
    },
    onError: (err) => console.error("[Command Router] Speech error:", err),
  });

  return (
    <div className="mt-4">
      <button onClick={start} disabled={listening} className="px-4 py-2 bg-green-600 text-white rounded">
        🎙 Start Listening
      </button>
      <button onClick={stop} disabled={!listening} className="ml-2 px-4 py-2 bg-red-600 text-white rounded">
        ⏹ Stop
      </button>
    </div>
  );
}
