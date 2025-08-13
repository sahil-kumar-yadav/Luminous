"use client";

import { useState, useRef } from "react";
import VoiceCommandRouter from "./VoiceCommandRouter";

export default function MusicPlayer({ playlist }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const audioRef = useRef(null);

  const currentSong = playlist[currentIndex];

  const playSong = () => {
    console.log("[MusicPlayer] Playing:", currentSong.title);
    audioRef.current?.play();
  };

  const pauseSong = () => {
    console.log("[MusicPlayer] Pausing:", currentSong.title);
    audioRef.current?.pause();
  };

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    console.log("[MusicPlayer] Skipping to next song");
  };

  const prevSong = () => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    console.log("[MusicPlayer] Going back to previous song");
  };

  const handleCommand = (command) => {
    const c = command.toLowerCase();
    console.log("[MusicPlayer] Received command:", c);

    if (c.includes("play")) playSong();
    if (c.includes("pause") || c.includes("stop")) pauseSong();
    if (c.includes("next")) nextSong();
    if (c.includes("previous") || c.includes("back")) prevSong();
  };

  return (
    <div className="p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{currentSong.title}</h2>
      <audio ref={audioRef} src={currentSong.url} controls autoPlay />


      <div className="mt-4 p-3 bg-black-700 rounded text-sm">
        <strong>Last Recognized Command:</strong>{" "}
        <span className="text-blue-600">{transcript || "—"}</span>
      </div>
    </div>
  );
}
