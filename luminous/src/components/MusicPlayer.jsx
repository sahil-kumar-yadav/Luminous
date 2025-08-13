"use client";

import { useState, useRef } from "react";
import VoiceCommandRouter from "./VoiceCommandRouter";
import { songs } from "@/lib/musicData";

export default function MusicPlayer() {
  const [current, setCurrent] = useState(0);
  const audioRef = useRef(null);

  const playSong = () => audioRef.current?.play();
  const pauseSong = () => audioRef.current?.pause();
  const nextSong = () => setCurrent((prev) => (prev + 1) % songs.length);
  const prevSong = () => setCurrent((prev) => (prev - 1 + songs.length) % songs.length);

  const handleCommand = (command) => {
    const c = command.toLowerCase();
    if (c.includes("play")) playSong();
    if (c.includes("pause")) pauseSong();
    if (c.includes("next")) nextSong();
    if (c.includes("previous")) prevSong();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">{songs[current].title}</h2>
      <audio ref={audioRef} src={songs[current].url} controls autoPlay />
      <VoiceCommandRouter onCommand={handleCommand} />
    </div>
  );
}
