'use client';
import { useRef, useState, useEffect } from 'react';
import { songs } from '@/lib/musicData';
import useTextToSpeech from '@/hooks/useTextToSpeech';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { speak } = useTextToSpeech();

  const playSong = (index) => {
    if (index < 0 || index >= songs.length) return;
    setCurrentSongIndex(index);
    audioRef.current.src = songs[index].url;
    audioRef.current.play();
    setIsPlaying(true);
    speak(`Playing ${songs[index].title}`);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    speak('Paused');
  };

  const nextSong = () => {
    playSong((currentSongIndex + 1) % songs.length);
  };

  const prevSong = () => {
    playSong((currentSongIndex - 1 + songs.length) % songs.length);
  };

  const volumeUp = () => {
    audioRef.current.volume = Math.min(1, audioRef.current.volume + 0.1);
    speak('Volume up');
  };

  const volumeDown = () => {
    audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.1);
    speak('Volume down');
  };

  // Voice command handling
  const handleCommand = (transcript) => {
    const cmd = transcript.toLowerCase();
    console.log('Music heard:', cmd);

    if (cmd.includes('play song')) {
      const songName = cmd.replace('play song', '').trim();
      const foundIndex = songs.findIndex(s => s.title.toLowerCase().includes(songName));
      if (foundIndex >= 0) playSong(foundIndex);
      else speak('Song not found');
    } else if (cmd.includes('play')) {
      playSong(currentSongIndex);
    } else if (cmd.includes('pause')) {
      pauseSong();
    } else if (cmd.includes('next song') || cmd.includes('skip')) {
      nextSong();
    } else if (cmd.includes('previous song') || cmd.includes('back')) {
      prevSong();
    } else if (cmd.includes('volume up')) {
      volumeUp();
    } else if (cmd.includes('volume down')) {
      volumeDown();
    }
  };

  useSpeechRecognition({ onResult: handleCommand });

  // Autoplay first song on load (optional)
  useEffect(() => {
    playSong(0);
  }, []);

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Now Playing: {songs[currentSongIndex].title}</h2>
      <audio ref={audioRef} controls className="w-full" />
      <div className="mt-4 flex gap-2">
        <button onClick={prevSong} className="px-4 py-2 rounded bg-gray-200 focus-visible:ring">Prev</button>
        <button onClick={() => playSong(currentSongIndex)} className="px-4 py-2 rounded bg-green-300 focus-visible:ring">Play</button>
        <button onClick={pauseSong} className="px-4 py-2 rounded bg-red-300 focus-visible:ring">Pause</button>
        <button onClick={nextSong} className="px-4 py-2 rounded bg-gray-200 focus-visible:ring">Next</button>
      </div>
    </div>
  );
}
