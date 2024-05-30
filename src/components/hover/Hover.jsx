"use client"

import { useEffect, useState } from 'react';

export default function Home() {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const synth = window.speechSynthesis;
      const loadVoices = () => {
        const voices = synth.getVoices();
        setVoices(voices);
        if (voices.length > 0 && !selectedVoice) {
          setSelectedVoice(voices[0]);
        }
      };
      loadVoices();
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
      }
    }
  }, [selectedVoice]);

  const speak = (text) => {
    if (typeof window !== 'undefined' && selectedVoice) {
      const synth = window.speechSynthesis;
      const utterThis = new SpeechSynthesisUtterance(text);
      utterThis.voice = selectedVoice;
      synth.speak(utterThis);
    }
  };

  const handleMouseEnter = (text) => {
    speak(text);
  };

  return (
    <div>
      <h1 className='mb-5'>Text to Speech on Hover</h1>
      <p
        onMouseEnter={() => handleMouseEnter('Hello, this is a hover text to speech example. Iam sahil yadav')}
        style={{ cursor: 'pointer', display: 'inline-block' }}
      >
        Hover over this text to hear it.
      </p>
      <div className='mt-5'>
        <label htmlFor="voiceSelect">Select Voice: </label>
        <select
          id="voiceSelect"
          onChange={(e) => {
            const selectedVoice = voices.find((voice) => voice.name === e.target.value);
            setSelectedVoice(selectedVoice);
          }}
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
