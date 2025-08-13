import MusicPlayer from '@/components/MusicPlayer';
import { songs } from '@/lib/musicData';

export default function MusicPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Accessible Music Player</h1>
      <MusicPlayer playlist={songs} />
    </div>
  );
}
