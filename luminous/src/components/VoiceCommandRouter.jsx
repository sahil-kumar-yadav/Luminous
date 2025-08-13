// src/components/VoiceCommandRouter.jsx
"use client";
import useVoskSpeech from "@/hooks/useVoskSpeech";
import { speak } from "@/lib/tts";

export default function VoiceCommandRouter() {
  const handleCommand = (command) => {
    console.log("Heard:", command);

    if (command.includes("news")) {
      speak("Navigating to news");
      window.location.href = "/news";
    }
    if (command.includes("music")) {
      speak("Opening music player");
      window.location.href = "/music";
    }
    if (command.includes("books")) {
      speak("Opening books");
      window.location.href = "/books";
    }
  };

  useVoskSpeech({
    onResult: handleCommand,
    onError: (err) => speak(`Speech recognition error: ${err}`)
  });

  return null; // This component doesn't render UI, only listens globally
}
