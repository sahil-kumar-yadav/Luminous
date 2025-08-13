'use client';

import { useEffect, useState } from 'react';
import useTextToSpeech from '@/hooks/useTextToSpeech';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';

export default function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { speak, stop } = useTextToSpeech();

  // Fetch news
  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (data.articles) {
          setArticles(data.articles);
        }
      });
  }, []);

  // Voice control
  const handleCommand = (transcript) => {
    const cmd = transcript.toLowerCase();
    if (cmd.includes('read latest headlines')) {
      readHeadline(0);
    } else if (cmd.includes('next headline')) {
      readHeadline(currentIndex + 1);
    } else if (cmd.includes('previous headline') || cmd.includes('back headline')) {
      readHeadline(currentIndex - 1);
    }
  };

  const readHeadline = (index) => {
    if (index >= 0 && index < articles.length) {
      setCurrentIndex(index);
      speak(articles[index].title);
    } else {
      speak('No more headlines');
    }
  };

  useSpeechRecognition({ onResult: handleCommand });

  return (
    <section
      aria-labelledby="news-heading"
      className="px-4 py-12 sm:px-6 lg:px-8 bg-white  min-h-[70vh]"
    >
      <div className="mx-auto max-w-4xl">
        <h1
          id="news-heading"
          className="text-3xl font-bold tracking-tight text-gray-900 mb-6"
        >
          Latest News
        </h1>

        {articles.length === 0 ? (
          <p className="text-gray-600 ">Loading headlines...</p>
        ) : (
          <ul className="space-y-6">
            {articles.map((a, i) => (
              <li
                key={i}
                className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
                tabIndex={0}
              >
                <h2 className="text-lg font-semibold text-blackmb-2">
                  {a.title}
                </h2>
                {a.description && (
                  <p className="text-black mb-3">
                    {a.description}
                  </p>
                )}
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 dark:text-blue-400 hover:underline focus:underline focus:outline-none"
                >
                  Read full article
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
