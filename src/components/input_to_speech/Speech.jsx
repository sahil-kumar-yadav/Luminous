"use client"

import { useState, useEffect } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const synth = window.speechSynthesis;
      const loadVoices = () => {
        const voices = synth.getVoices();
        setVoices(voices);
        if (voices.length > 0) {
          setSelectedVoice(voices[0].name); // Set the first voice as the default
        }
      };
      
      // Load voices asynchronously
      loadVoices();
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const handleVoiceChange = (e) => {
    setSelectedVoice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const synth = window.speechSynthesis;
      const utterThis = new SpeechSynthesisUtterance(text);
      const voice = voices.find(voice => voice.name === selectedVoice);
      if (voice) {
        utterThis.voice = voice;
      }
      synth.speak(utterThis);
    }
  };

  return (
    <div>
      <h1>Text to Speech</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
          rows="4"
          cols="50"
        />
        <div>
          <label htmlFor="voiceSelect">Select Voice: </label>
          <select id="voiceSelect" value={selectedVoice} onChange={handleVoiceChange}>
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Convert to Speech</button>
      </form>
    </div>
  );
}

