'use client';
import MusicPlayer from '@/components/MusicPlayer';

export default function MusicPage() {
  return (
    <section aria-labelledby="music-heading">
      <h1 id="music-heading" className="mb-4 text-2xl font-bold">Music</h1>
      <p className="mb-6">Control music playback with your voice. Try commands like:</p>
      <ul className="list-disc pl-6 mb-6">
        <li>Play</li>
        <li>Pause</li>
        <li>Next song</li>
        <li>Previous song</li>
        <li>Play song Jazz in Paris</li>
        <li>Volume up / Volume down</li>
      </ul>
      <MusicPlayer />
    </section>
  );
}
