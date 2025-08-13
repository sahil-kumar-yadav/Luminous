"use client";
import { useState, useRef } from "react";
import useVoskSpeech from "@/hooks/useVoskSpeech";

export default function MusicPlayer({ playlist }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);

  const playSong = () => {
    audioRef.current.play().catch(err => console.warn("Play blocked", err));
  };
  const pauseSong = () => audioRef.current.pause();
  const nextSong = () => setCurrentIndex((prev) => (prev + 1) % playlist.length);
  const prevSong = () => setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);

  useVoskSpeech({
    onResult: (text) => {
      const cmd = text.toLowerCase();
      if (cmd.includes("play")) playSong();
      if (cmd.includes("pause") || cmd.includes("stop")) pauseSong();
      if (cmd.includes("next")) nextSong();
      if (cmd.includes("previous") || cmd.includes("back")) prevSong();
    }
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Now Playing: {playlist[currentIndex].title}</h2>
      <audio ref={audioRef} src={playlist[currentIndex].url} controls />
    </div>
  );
}
