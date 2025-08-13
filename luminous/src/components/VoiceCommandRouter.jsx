'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import useSpeechRecognition from '@/hooks/useSpeechRecognition';
import useTextToSpeech from '@/hooks/useTextToSpeech';

export default function VoiceCommandRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const { speak } = useTextToSpeech();

  const handleCommand = (transcript) => {
    const cmd = transcript.toLowerCase();
    console.log('Heard:', cmd);

    // Skip routing if we're already on a voice-active page
    if (['/music', '/news', '/books'].includes(pathname)) return;

    if (cmd.includes('news')) {
      router.push('/news');
      speak('Opening news');
    } else if (cmd.includes('music')) {
      router.push('/music');
      speak('Opening music player');
    } else if (cmd.includes('books') || cmd.includes('book')) {
      router.push('/books');
      speak('Opening books library');
    } else if (cmd.includes('feedback') || cmd.includes('support')) {
      router.push('/feedback');
      speak('Opening feedback form');
    }
  };

  const { start, stop, listening } = useSpeechRecognition({
    onResult: handleCommand,
    onError: (err) => speak(`Speech recognition error: ${err}`)
  });

  useEffect(() => {
    start();
    return () => stop();
  }, []);

  return (
    <div aria-live="polite" className="fixed bottom-4 right-4 rounded-lg bg-black/80 px-3 py-2 text-sm text-white">
      🎤 Voice {listening ? 'listening...' : 'off'}
    </div>
  );
}
