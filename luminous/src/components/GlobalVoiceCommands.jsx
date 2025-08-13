"use client";

import VoiceCommandRouter from "@/components/VoiceCommandRouter";

export default function GlobalVoiceCommands() {
  const handleGlobalCommand = (cmd) => {
    console.log("[Global Command Handler]", cmd);
    if (cmd.includes("home")) window.location.href = "/";
    if (cmd.includes("music")) window.location.href = "/music";
  };

  return <VoiceCommandRouter onCommand={handleGlobalCommand} />;
}
