import React, { useEffect, useRef } from 'react';
import './Music.css';
import {MusicNoteScene} from '../three-dee/music-note-scene.ts';

const Music: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const musicNoteSceneRef = useRef<MusicNoteScene | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js scene
    musicNoteSceneRef.current = new MusicNoteScene({
      widthRatio: 1.0,
      heightRatio: 0.25,
      numMusicNotes: 30,
      canvas: canvasRef.current
    });

    // Start the animation loop
    musicNoteSceneRef.current.animate();

    // Cleanup when the component is unmounted
    return () => {
      if (musicNoteSceneRef.current) {
        musicNoteSceneRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="music-page">
      <canvas ref={canvasRef} className="music-canvas"></canvas>
      <div className="music-content">
        <h1>Portfolio</h1>
        <p>This is where the portfolio will go.</p>
      </div>
    </div>
  );
};

export default Music;
