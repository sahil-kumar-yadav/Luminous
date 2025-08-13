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

  // Voice control inside news page
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
    <section aria-labelledby="news-heading">
      <h1 id="news-heading" className="mb-4 text-2xl font-bold">Latest News</h1>
      {articles.length === 0 && <p>Loading headlines...</p>}
      <ul className="space-y-4">
        {articles.map((a, i) => (
          <li key={i} className="border p-4 rounded-lg" tabIndex={0}>
            <h2 className="font-semibold">{a.title}</h2>
            {a.description && <p>{a.description}</p>}
            <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              Read full article
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
