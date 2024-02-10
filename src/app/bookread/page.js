"use client"

import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const BookPage = () => {
  const [fontSize, setFontSize] = useState(16);
  const [backgroundColor, setBackgroundColor] = useState('#fff');
  const { transcript, resetTranscript } = useSpeechRecognition();

  const increaseFontSize = () => setFontSize(fontSize + 2);
  const decreaseFontSize = () => setFontSize(Math.max(fontSize - 2, 12));
  const changeBackgroundColor = () => setBackgroundColor(backgroundColor === '#fff' ? '#000' : '#fff');

  const readBook = () => {
    const bookContent = "Your book content goes here."; // Get the actual book content
    SpeechRecognition.startListening({ language: 'en' }); // Start listening for speech input
  };

  const stopReading = () => {
    SpeechRecognition.stopListening(); // Stop listening for speech input
    resetTranscript(); // Reset the transcript
  };

  return (
    <div style={{ fontSize: `${fontSize}px`, backgroundColor, padding: '20px' }}>
      <p>Your book content goes here.</p>
      <button onClick={increaseFontSize}>Increase Font Size</button>
      <button onClick={decreaseFontSize}>Decrease Font Size</button>
      <button onClick={changeBackgroundColor}>Toggle Background Color</button>
      <button onClick={readBook}>Start Reading</button>
      <button onClick={stopReading}>Stop Reading</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default BookPage;
