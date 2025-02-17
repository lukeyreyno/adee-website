import React, {useEffect, useRef, useState} from 'react';
import './Music.css';
import {MusicNoteScene} from '../three-dee/music-note-scene.ts';
import {type ButtonData, ButtonGroup} from '../modules/button-group.tsx';
import {type TimelineNode, type NodeFilterPredicate, VerticalTimeline} from '../modules/vertical-timeline.tsx';

const Music: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const musicNoteSceneRef = useRef<MusicNoteScene | null>(null);

  const [nodeFilter, setNodeFilter] = useState<NodeFilterPredicate>(
    () => (node: TimelineNode) => true
  );

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

  const verticalTimelineNodes: TimelineNode[] = [
    {
      title: 'First Node',
      category: 'Production Experience',
      description: 'This is the first node.',
      date: new Date('2021-01-01')
    },
    {
      title: 'Second Node',
      category: 'Performance Credits',
      description: 'This is the second node.',
      date: new Date('2024-05-19')
    },
    {
      title: 'Third Node',
      category: 'Teaching Experience',
      description: 'This is the third node.',
      date: new Date('2024-05-08')
    },
    {
      title: 'Fourth Node',
      category: 'Production Experience',
      description: 'This is the fourth node.',
      date: new Date('2022-01-01')
    },
    {
      title: 'Fifth Node',
      category: 'Teaching Experience',
      description: 'This is the fifth node.',
      date: new Date('2024-05-09')
    },
    {
      title: 'Sixth Node',
      category: 'Performance Credits',
      description: 'This is the sixth node.',
      date: new Date('2024-05-10')
    },
    {
      title: 'Seventh Node',
      category: 'Accompaniment Experience',
      description: 'This is the seventh node.',
      date: new Date('2024-03-10')
    },
    {
      title: 'Eighth Node',
      category: 'Accompaniment Experience',
      description: 'This is the Eighth node.',
      date: new Date('2024-04-10')
    },
    {
      title: 'Ninth Node',
      category: 'Teaching Experience',
      description: 'This is the Ninth node.',
      date: new Date('2024-04-12')
    },
    {
      title: 'Tenth Node',
      category: 'Performance Credits',
      description: 'This is the Tenth node. Which has a long description...'.repeat(40),
      date: new Date('2024-05-08')
    },
  ];

  const nodeFilterButtons: ButtonData[] = [
    {
      label: 'All',
      onClick: () => {
        setNodeFilter(() => (node: TimelineNode) => true)
      }
    },
    {
      label: 'Production Experience',
      onClick: () => {
        setNodeFilter(() => (node: TimelineNode) => node.category === 'Production Experience')
      }
    },
    {
      label: 'Performance Credits',
      onClick: () => {
        setNodeFilter(() => (node: TimelineNode) => node.category === 'Performance Credits')
      }
    },
    {
      label: 'Teaching Experience',
      onClick: () => {
        setNodeFilter(() => (node: TimelineNode) => node.category === 'Teaching Experience')
      }
    },
    {
      label: 'Accompaniment Experience',
      onClick: () => {
        setNodeFilter(() => (node: TimelineNode) => node.category === 'Accompaniment Experience')
      }
    },
  ];

  return (
    <div className="music-page">
      <canvas ref={canvasRef} className="music-canvas"></canvas>
      <div className="music-content">
        <ButtonGroup buttons={nodeFilterButtons} buttonType='select' defaultSelected={[0]} />
        <VerticalTimeline nodes={verticalTimelineNodes} filterPredicate={nodeFilter} />
      </div>
    </div>
  );
};

export default Music;
