import React, { useState } from 'react';
import './vertical-timeline.css';

interface TimelineNode {
  title: string;
  description: string;
  date: Date;
}

interface TimelineProps {
  nodes: TimelineNode[];
  filterPredicate?: (node: TimelineNode) => boolean;
}

const tickContainerSize = 20;

const generateTicks = (nodes: TimelineNode[], ascendingOrder: boolean = true) => {
  const dates = nodes.map(node => node.date);

  // Set the min and max dates from the nodes, and add a month buffer
  const monthBuffer = 1;
  const minDate = new Date(dates.reduce((min, date) => Math.min(min, date.getTime()), Infinity));
  minDate.setMonth(minDate.getMonth() - monthBuffer);

  const maxDate = new Date(dates.reduce((max, date) => Math.max(max, date.getTime()), -Infinity));
  maxDate.setMonth(maxDate.getMonth() + monthBuffer);
  
  const ticks: Date[] = [];
  const currentDate = (ascendingOrder) ? new Date(minDate) : new Date(maxDate);
  const monthIncrement = (ascendingOrder) ? 1 : -1;
  const condition = (ascendingOrder) ?
    () => currentDate <= maxDate : () => currentDate >= minDate;

  while (condition()) {
    ticks.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + monthIncrement);
  }

  return {
    dates: ticks,
    elements: ticks.map((date, index) => (
      <div key={index} className='tick-container' style={{ height: `${tickContainerSize}vh` }}>
        <div className='tick'>
          {date.toLocaleString('default', { month: 'short', year: 'numeric' })}
        </div>
        <div className='tick-dot'></div>
      </div>
    ))
  };
};

const VerticalTimeline: React.FC<TimelineProps> = ({nodes, filterPredicate}) => {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [currentlyHoveredNode, setcurrentlyHoveredNode] = useState<number | null>(null);
  const [hoveredNodes, setHoveredNodes] = useState<number[]>([]);

  const filteredNodes = filterPredicate ? nodes.filter(filterPredicate) : nodes;
  const {dates, elements: ticks} = generateTicks(filteredNodes, false);
  const monthNodeCounts: Record<number, number> = {};

  const createNode = (node: TimelineNode, index: number) => {
    const selectedNodeBehavior = () => {
      return selectedNode === index && <p className='node-description'>{node.description}</p>;
    }

    const monthIndex = dates.findIndex(date => {
      const year = date.getFullYear() === node.date.getFullYear()
      const month = date.getMonth() === node.date.getMonth()
      return year && month; 
    });

    const monthSideIndex = monthIndex * 2 + (index % 2);

    // Track how many nodes exist for the current month
    if (!monthNodeCounts[monthSideIndex]) {
      monthNodeCounts[monthSideIndex] = 0;
    }

    const verticalOffsetMultiplier = 0.5; // in vh
    const horizontalOffsetMultiplier = 30;
    const verticalOffset = monthNodeCounts[monthSideIndex] * verticalOffsetMultiplier;
    const horizontalOffset = monthNodeCounts[monthSideIndex] * horizontalOffsetMultiplier;
    monthNodeCounts[monthSideIndex]++;

    const handleMouseClick = () => {
      setSelectedNode(selectedNode === index ? null : index);
    }

    const handleMouseEnter = () => {
      setcurrentlyHoveredNode(index);
      setHoveredNodes(prev => {
        const newHoveredNodes = prev.filter(i => i !== index);
        newHoveredNodes.push(index);
        return newHoveredNodes;
      });
    };

    const handleMouseLeave = () => {
      setcurrentlyHoveredNode(null);
    };

    const zIndexBase = 10;
    const zIndex = hoveredNodes.includes(index) ? hoveredNodes.indexOf(index) + zIndexBase : 1;

    const chooseDotColor = () => {
      if (selectedNode === index) {
        return 'var(--green-dot)';
      } else if (currentlyHoveredNode === index) {
        return 'var(--yellow-dot)';
      } else {
        return 'var(--blue-dot)';
      }
    }

    return (
      <div key={index}
            style={{ 
              top: `${monthIndex * tickContainerSize + verticalOffset}vh`,
              left: index % 2 ? `calc(10% + ${horizontalOffset}px)` : `calc(60% + ${horizontalOffset}px)`,
              width: '20%',
              zIndex: zIndex,
            }}
            className='node-container'>
        <div className='node-dot'
              style={{backgroundColor: chooseDotColor()}}
              onClick={handleMouseClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
        </div>
        <div className='node-content'
            onClick={handleMouseClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
          <h3 className='node-title'>{node.title}</h3>
          {selectedNodeBehavior()}
        </div>
      </div>
    );
  };

  return (
    <div className='timeline-container'>
      <div className='timeline-line'></div>
      {ticks}
      {filteredNodes.map((node, index) => createNode(node, index))}
    </div>
  );
};

export {type TimelineNode, VerticalTimeline};
