"use client";
import useVosk from "@/hooks/useVosk";
import { speak } from "@/lib/tts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VoiceCommandRouter() {
  const router = useRouter();

  const handle = (cmd) => {
    const text = cmd.toLowerCase();
    if (text.includes("news")) { speak("Opening news"); router.push("/news"); }
    else if (text.includes("music")) { speak("Playing music"); router.push("/music"); }
    else if (text.includes("books")) { speak("Opening books"); router.push("/books"); }
  };

  const { start, listening } = useVosk({
    onResult: handle,
    onPartial: () => {},
    onError: (err) => console.error("Speech error:", err),
  });

  useEffect(() => { start(); }, []);

  return null;
}
