import React, {
  type ReactNode,
  useEffect,
  useState
} from 'react';
import './vertical-timeline.css';

interface TimelineNode {
  title: string;
  category?: string;
  description: string;
  date: Date;
}

interface RangedTimelineNode extends TimelineNode {
  startDate: Date;
  endDate: Date;
}

type TimelineDisplayMode = 'default' | 'minimal' | 'minimal-left';

interface TimelineProps {
  nodes: TimelineNode[];
  displayMode?: TimelineDisplayMode;
  filterPredicate?: (node: TimelineNode) => boolean;
}

type NodeFilterPredicate = (node: TimelineNode) => boolean;

const tickContainerSize = 20;

const getDates = (
  nodes: TimelineNode[],
  ascendingOrder: boolean = true
) => {
  const dates = nodes.map(node => node.date);

  // Set the min and max dates from the nodes, and add a month buffer
  const monthBuffer = 1;
  const minDate = new Date(dates.reduce(
    (min, date) => Math.min(min, date.getTime()), Infinity
  ));
  minDate.setMonth(minDate.getMonth() - monthBuffer);

  const maxDate = new Date(dates.reduce(
    (max, date) => Math.max(max, date.getTime()), -Infinity
  ));
  maxDate.setMonth(maxDate.getMonth() + monthBuffer);

  const processedDates: Date[] = [];
  const currentDate = (ascendingOrder) ? new Date(minDate) : new Date(maxDate);
  const monthIncrement = (ascendingOrder) ? 1 : -1;
  const condition = (ascendingOrder) ?
    () => currentDate <= maxDate : () => currentDate >= minDate;

  while (condition()) {
    processedDates.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + monthIncrement);
  }

  return processedDates;
}

const generateTicks = (
  dates: Date[],
  displayMode: TimelineDisplayMode,
) => {
    let tickContainerStyle: React.CSSProperties = {
      height: `${tickContainerSize}vh`,
    };
    let tickLabelStyle: React.CSSProperties;
    switch (displayMode) {
      case 'minimal-left': {
        tickContainerStyle = {
          ...tickContainerStyle,
          alignItems: 'left',
        };
        break;
      }
      case 'minimal':
      case 'default':
      default: {
        tickContainerStyle = {
          ...tickContainerStyle,
          alignItems: 'center',
        };
        tickLabelStyle = {
          transform: 'translateX(-50%)',
        }
      }
    }

  return dates.map((date, index) => (
      <div key={index} className='tick-container' style={tickContainerStyle}>
        <div className='tick-label'
          style={tickLabelStyle}>
          {date.toLocaleString('default', { month: 'short', year: 'numeric' })}
        </div>
        <div className='tick-dot'></div>
      </div>
    ))
};

const VerticalTimeline: React.FC<TimelineProps> = ({
  nodes,
  displayMode = 'default',
  filterPredicate = () => true,
}) => {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [currentlyHoveredNode, setcurrentlyHoveredNode] = useState<number | null>(null);
  const [hoveredNodes, setHoveredNodes] = useState<number[]>([]);

  const filteredNodes = nodes.filter(filterPredicate);
  const dates = getDates(filteredNodes, false);
  const monthNodeCounts: Record<number, number> = {};

  useEffect(() => {
    setSelectedNode(null);
  }, [filterPredicate]);

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

    let nodeContainerDiv: ReactNode;
    let nodeContainerStyle: React.CSSProperties = {};
    switch (displayMode) {
      case 'minimal-left':
      case 'minimal': {
        if (currentlyHoveredNode === index || selectedNode === index) {
          nodeContainerDiv = <div className='node-content'
            onClick={handleMouseClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <h3 className='node-title'>{node.title}</h3>
            {selectedNodeBehavior()}
          </div>
        }

        nodeContainerStyle = {
          top: `${monthIndex * tickContainerSize}vh`,
          left: `calc(50% + ${horizontalOffset}px)`,
          transform: 'translateX(-50%)',
          zIndex: zIndex,
        };
        break;
      }
      case 'default':
      default: {
        nodeContainerDiv = <div className='node-content'
          onClick={handleMouseClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <h3 className='node-title'>{node.title}</h3>
          {selectedNodeBehavior()}
        </div>
        nodeContainerStyle = {
          top: `${monthIndex * tickContainerSize + verticalOffset}vh`,
          left: index % 2 ? `calc(10% + ${horizontalOffset}px)` : `calc(60% + ${horizontalOffset}px)`,
          width: '20%',
          zIndex: zIndex,
        }
        break;
      }
    }

    return (
      <div key={index}
        style={nodeContainerStyle}
        className='node-container'>
        <div className='node-dot'
          style={{ backgroundColor: chooseDotColor() }}
          onClick={handleMouseClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
        </div>
        {nodeContainerDiv}
      </div>
    );
  };

  const createTimelineLine = () => {
    let lineStyle: React.CSSProperties;
    switch (displayMode) {
      case 'minimal-left': {
        lineStyle = {
          width: '5px',
          left: '0%',
        };
        break;
      }
      case 'minimal':
      case 'default':
      default: {
        lineStyle = {
          width: '1px',
          left: '50%',
          transform: 'translateX(-50%)',
        };
      }
    }

    return <div className='timeline-line' style={lineStyle}></div>;
  }

  const ticksElements = generateTicks(dates, displayMode);

  return (
    <div className='timeline-container'>
      {createTimelineLine()}
      {ticksElements}
      {filteredNodes.map((node, index) => createNode(node, index))}
    </div>
  );
};

export {
  type TimelineNode,
  type NodeFilterPredicate,
  type RangedTimelineNode,
  type TimelineProps,
  VerticalTimeline
};
