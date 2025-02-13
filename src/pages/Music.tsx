import React, { useEffect, useRef } from 'react';
import './Music.css';
import {MusicNoteScene} from '../three-dee/music-note-scene.ts';
import {VerticalTimeline} from '../modules/vertical-timeline.tsx';

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

  const verticalTimelineNodes = [
    {
      title: 'First Node',
      description: 'This is the first node.',
      date: new Date('2021-01-01')
    },
    {
      title: 'Second Node',
      description: 'This is the second node.',
      date: new Date('2024-05-19')
    },
    {
      title: 'Third Node',
      description: 'This is the third node.',
      date: new Date('2024-05-01')
    },
    {
      title: 'Fourth Node',
      description: 'This is the fourth node.',
      date: new Date('2022-01-01')
    },
    {
      title: 'Fifth Node',
      description: 'This is the fifth node.',
      date: new Date('2024-05-01')
    },
  ];

  return (
    <div className="music-page">
      <canvas ref={canvasRef} className="music-canvas"></canvas>
      <div className="music-content">
        <h1>Portfolio</h1>
        <p>This is where the portfolio will go.</p>
        <VerticalTimeline nodes={verticalTimelineNodes} />
      </div>
    </div>
  );
};

export default Music;
