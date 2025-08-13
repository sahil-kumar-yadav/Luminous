'use client';

import { useState, useEffect, useRef } from "react";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

export default function AccessibleBookPlayer({ books }) {
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [reading, setReading] = useState(false);
  const utterRef = useRef(null);

  const currentBook = books[currentBookIndex];
  const currentChapter = currentBook.chapters[currentChapterIndex];

  const { start, stop, listening } = useSpeechRecognition({
    phrases: [
      "read book",
      "next chapter",
      "previous chapter",
      "stop reading"
    ],
    lang: "en-US",
    minConfidence: 0.75,
    onResult: (cmd) => {
      console.log("[Book Command]", cmd.toLowerCase());
      handleCommand(cmd.toLowerCase());
    },
    onError: (err) => console.error("[Book Command Error]", err),
  });

  const handleCommand = (cmd) => {
    if (cmd.startsWith("read book")) {
      const bookName = cmd.replace("read book", "").trim().toLowerCase();
      const bookIndex = books.findIndex(b => b.title.toLowerCase().includes(bookName));
      if (bookIndex >= 0) {
        setCurrentBookIndex(bookIndex);
        setCurrentChapterIndex(0);
        speakChapter(bookIndex, 0);
      } else {
        console.log("Book not found:", bookName);
      }
    } else if (cmd.includes("next chapter")) {
      nextChapter();
    } else if (cmd.includes("previous chapter") || cmd.includes("back chapter")) {
      prevChapter();
    } else if (cmd.includes("stop reading")) {
      stopReading();
    }
  };

  const speakChapter = (bookIndex = currentBookIndex, chapterIndex = currentChapterIndex) => {
    stopReading();
    const utter = new SpeechSynthesisUtterance(books[bookIndex].chapters[chapterIndex]);
    utter.onend = () => console.log("Chapter finished.");
    utter.onerror = (e) => console.error("TTS error:", e);
    utterRef.current = utter;
    speechSynthesis.speak(utter);
    setReading(true);
  };

  const stopReading = () => {
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    setReading(false);
  };

  const nextChapter = () => {
    const nextIndex = currentChapterIndex + 1;
    if (nextIndex < currentBook.chapters.length) {
      setCurrentChapterIndex(nextIndex);
      speakChapter(currentBookIndex, nextIndex);
    } else {
      console.log("You are at the last chapter.");
      stopReading();
    }
  };

  const prevChapter = () => {
    const prevIndex = currentChapterIndex - 1;
    if (prevIndex >= 0) {
      setCurrentChapterIndex(prevIndex);
      speakChapter(currentBookIndex, prevIndex);
    } else {
      console.log("You are at the first chapter.");
      stopReading();
    }
  };

  useEffect(() => {
    return () => stopReading(); // cleanup
  }, []);

  return (
    <section
      aria-labelledby="book-reader-heading"
      className="px-4 py-12 sm:px-6 lg:px-8 bg-white "
    >
      <div className="max-w-3xl mx-auto border border-neutral-200  rounded-xl p-6 shadow-md">
        <h2
          id="book-reader-heading"
          className="text-2xl font-bold text-gray-900  mb-2"
        >
          {currentBook.title}
        </h2>
        <p className="italic text-black  mb-4">
          Chapter {currentChapterIndex + 1}
        </p>

        <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
          <p>{currentChapter}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => speakChapter()}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            🔊 Read Chapter
          </button>
          <button
            onClick={stopReading}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            ⏹ Stop
          </button>
          <button
            onClick={prevChapter}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            ⬅ Previous
          </button>
          <button
            onClick={nextChapter}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            ➡ Next
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          {listening ? "🎤 Listening for commands..." : "💬 Say: 'Read book Alice', 'Next chapter', etc."}
        </div>
      </div>
    </section>
  );
}
