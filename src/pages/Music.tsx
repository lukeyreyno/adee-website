import React, { useEffect, useRef, useState } from 'react';
import './Music.css';
import {MusicNoteScene} from '@adee/three-dee/music-note-scene';
import {type ButtonData, ButtonGroup} from '@adee/components/button-group';
import {type TimelineNode, type NodeFilterPredicate, VerticalTimeline} from '@adee/components/vertical-timeline';
import {getEnvVar} from '@adee/utils/env-utils';
import {fetchSheet} from '@adee/utils/sheets-utils';

const GOOGLE_DRIVE_API_KEY = getEnvVar('REACT_APP_GOOGLE_DRIVE_API_KEY');
const MUSIC_DATA_SHEET_ID = '11QQAfIN8xuDkujVXHpwKQjZdTuY47JgFzRvflkjB9Ss';

const USE_EXAMPLE_NODES = false;
const EXAMPLE_NODES_PATH = './data/example_nodes.json';

type RawTimelineNode = {
  title: string;
  category?: string;
  description: string;
  date?: string | Date | 'current';
  startDate?: string | Date;
  endDate?: string | Date | 'current';
}

const Music: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const musicNoteSceneRef = useRef<MusicNoteScene | null>(null);
  const [timelineData, setTimelineData] = useState<TimelineNode[]>([]);

  const [nodeFilter, setNodeFilter] = useState<NodeFilterPredicate>(
    () => (node: TimelineNode) => true
  );

  useEffect(() => {
    const runAsyncEffect = async () => {
      if (!canvasRef.current) {
        return;
      }

      // Initialize Three.js scene
      musicNoteSceneRef.current = new MusicNoteScene({
        widthRatio: 1.0,
        heightRatio: 0.25,
        numMusicNotes: 30,
        canvas: canvasRef.current
      });

      // Start the animation loop
      musicNoteSceneRef.current.animate();

      let rawNodeData: RawTimelineNode[]
      if (USE_EXAMPLE_NODES) {
        const response = await fetch(EXAMPLE_NODES_PATH)
        rawNodeData = await response.json()
      } else {
        rawNodeData = await fetchSheet(GOOGLE_DRIVE_API_KEY, MUSIC_DATA_SHEET_ID)
      }

      if (!rawNodeData || rawNodeData.length === 0) {
        console.error('No music timeline data found.');
        return;
      }

      const parsedData = rawNodeData.map((item: RawTimelineNode) => {
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
      }).filter((item): item is TimelineNode => item !== null) as TimelineNode[];

      setTimelineData(parsedData);
    };

    runAsyncEffect();

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
        <VerticalTimeline nodes={timelineData} displayMode='minimal' filterPredicate={nodeFilter} />
      </div>
    </div>
  );
};

export default Music;
