"use client";

import { useState, useRef } from "react";

// Simple Levenshtein distance for fuzzy matching
function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[a.length][b.length];
}

export default function useSpeechRecognition({
  phrases = [],
  lang = "en-US",
  minConfidence = 0.7,
  onResult,
  onError,
}) {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

  const start = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      console.error("Web Speech API is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log("[Speech] Recognition started");
      setListening(true);
    };

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript.trim().toLowerCase();
        const confidence = event.results[i][0].confidence;
        const isFinal = event.results[i].isFinal;

        console.log(`[Speech] Heard: "${transcript}" (confidence: ${confidence}, final: ${isFinal})`);

        if (isFinal && confidence >= minConfidence) {
          let matchedPhrase = transcript;

          // Fuzzy match
          if (phrases.length) {
            let bestMatch = phrases[0];
            let bestScore = Infinity;

            for (let phrase of phrases) {
              const distance = levenshtein(transcript, phrase.toLowerCase());
              if (distance < bestScore) {
                bestScore = distance;
                bestMatch = phrase;
              }
            }

            matchedPhrase = bestMatch;
            console.log(`[Speech] Matched to: "${bestMatch}" (distance: ${bestScore})`);
          }

          onResult?.(matchedPhrase);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("[Speech] Error:", event.error);
      onError?.(event.error);
    };

    recognition.onend = () => {
      console.log("[Speech] Recognition ended");
      setListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stop = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return { start, stop, listening };
}
