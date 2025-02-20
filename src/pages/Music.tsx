import React, { useEffect, useRef, useState } from 'react';
import './Music.css';
import {MusicNoteScene} from '../three-dee/music-note-scene.ts';
import {type ButtonData, ButtonGroup} from '../components/button-group.tsx';
import {type TimelineNode, type NodeFilterPredicate, VerticalTimeline} from '../components/vertical-timeline.tsx';

const NODE_DATA_URL = './data/portfolio_nodes.json';

const Music: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const musicNoteSceneRef = useRef<MusicNoteScene | null>(null);
  const [timelineData, setTimelineData] = useState<TimelineNode[]>([]);

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

    fetch(NODE_DATA_URL)
      .then(response => response.json())
      .then(data => {
        interface RawTimelineNode {
          title: string;
          category?: string;
          description: string;
          date?: string | Date | 'current';
          startDate?: string | Date;
          endDate?: string | Date | 'current';
        }

        const parsedData = data.map((item: RawTimelineNode) => {
          if (item.date !== undefined) {
            item.date = (item.date === 'current') ? new Date() : new Date(item.date);
          }

          if (item.startDate !== undefined && item.endDate !== undefined) {
            item.startDate = new Date(item.startDate);
            item.endDate = (item.endDate === 'current') ? new Date() : new Date(item.endDate);
            item.date = item.date ?? new Date((item.startDate.getTime() + item.endDate.getTime()) / 2);
          }

          if (item.date === undefined) {
            console.error('Error parsing timeline data:', item);
            return null;
          }

          return item;
        }).filter((item: RawTimelineNode) => item !== null) as TimelineNode[];
        setTimelineData(parsedData);
      })
      .catch(error => console.error('Error fetching timeline data:', error));

    // Cleanup when the component is unmounted
    return () => {
      if (musicNoteSceneRef.current) {
        musicNoteSceneRef.current.dispose();
      }
    };
  }, []);

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
        <VerticalTimeline nodes={timelineData} displayMode='minimal-left' filterPredicate={nodeFilter} />
      </div>
    </div>
  );
};

export default Music;
