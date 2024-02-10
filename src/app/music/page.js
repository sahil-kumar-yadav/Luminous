"use client"

import { useState } from 'react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const playPause = () => setIsPlaying(!isPlaying);
    const skipTrack = () => {
        // Implement logic to skip to the next track
        console.log('Skipping to the next track');
    };

    return (
        <div>
            <button onClick={playPause}>{isPlaying ? 'Pause' : 'Play'}</button>
            <button onClick={skipTrack}>Skip Track</button>
        </div>
    );
};

export default MusicPlayer;
