"use client"
import { useEffect, useState } from 'react';

const TextToSpeech = ({ text }) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const synth = window.speechSynthesis;
      const loadVoices = () => {
        const voices = synth.getVoices();
        setVoices(voices);
        if (voices.length > 0 && !selectedVoice) {
          setSelectedVoice(voices[0].name); // Set the first voice as the default
        }
      };
      loadVoices();
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
      }
    }
  }, [selectedVoice]);

  const speak = () => {
    if (typeof window !== 'undefined' && selectedVoice) {
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
      <span
        onMouseEnter={speak}
        style={{ cursor: 'pointer', display: 'inline-block' }}
      >
        {text}
      </span>
      <div>
        <label htmlFor="voiceSelect">Select Voice: </label>
        <select
          id="voiceSelect"
          onChange={(e) => setSelectedVoice(e.target.value)}
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
};

export default TextToSpeech;
