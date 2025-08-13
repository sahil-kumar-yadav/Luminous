'use client';
import { useState, useEffect, useRef } from 'react';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import useTextToSpeech from '@/hooks/useTextToSpeech';

export default function MusicPlayer({ playlist }) {
  const { speak } = useTextToSpeech();
  const audioRef = useRef(null);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [ready, setReady] = useState(false);

  const { start, stop, listening } = useSpeechRecognition({
    onResult: (cmd) => handleCommand(cmd.toLowerCase()),
    onError: (err) => {
      if (err === 'no-speech') return; // ignore silent cases
      if (err === 'not-allowed') speak('Please allow microphone access.');
      console.error('Speech recognition error:', err);
    }
  });

  useEffect(() => {
    return () => stop();
  }, []);

  const playSong = (index = currentSongIndex) => {
    setCurrentSongIndex(index);
    const song = playlist[index];
    audioRef.current.src = song.url;
    audioRef.current
      .play()
      .then(() => speak(`Playing ${song.title}`))
      .catch((err) => console.error('Playback failed:', err));
  };

  const pauseSong = () => {
    audioRef.current.pause();
    speak('Paused');
  };

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    playSong(nextIndex);
  };

  const prevSong = () => {
    const prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    playSong(prevIndex);
  };

  const handleCommand = (cmd) => {
    console.log('Voice command:', cmd);
    if (cmd.includes('play next')) nextSong();
    else if (cmd.includes('play previous')) prevSong();
    else if (cmd.includes('pause')) pauseSong();
    else if (cmd.includes('play')) playSong();
  };

  const unlockAndStart = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    } catch (e) {
      console.warn('Audio unlock failed:', e);
    }
    setReady(true);
    start();
    speak('Voice control enabled. Say Play to start music.');
  };

  return (
    <div>
      {!ready && (
        <button
          onClick={unlockAndStart}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enable Voice Control
        </button>
      )}

      <audio ref={audioRef} controls className="mt-4 w-full" />

      {ready && (
        <p className="mt-2 text-sm text-gray-700">
          🎤 Voice {listening ? 'listening...' : 'off'} — Try: "Play", "Pause", "Play next", "Play previous"
        </p>
      )}

      <div className="mt-4">
        <h2 className="font-bold">Playlist</h2>
        <ul>
          {playlist.map((song, i) => (
            <li
              key={song.url}
              className={i === currentSongIndex ? 'font-bold text-blue-600' : ''}
            >
              {i + 1}. {song.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
