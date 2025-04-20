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

const DEFAULT_TICK_CONTAINER_SIZE = 25; // in vh

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

// Group nodes by month and year, so they can be referenced later without
// having to filter through the entire list of nodes.
// Keep track of the unique indices per node, so react state can be updated
// on a per-node basis.
type NodeGroup = {
  nodes: TimelineNode[];
  indices: number[];
};

const groupNodesByDate = (nodes: TimelineNode[]) => {
  const groupedNodes: Record<string, NodeGroup> = {};

  nodes.forEach((node, index) => {
    const key = `${node.date.getFullYear()}-${node.date.getMonth()}`;
    if (!groupedNodes[key]) {
      groupedNodes[key] = { nodes: [], indices: [] };
    }
    groupedNodes[key].nodes.push(node);
    groupedNodes[key].indices.push(index);
  });

  return groupedNodes;
};

const generateTicks = (
  groupedNodes: Record<string, NodeGroup>,
  dates: Date[],
  displayMode: TimelineDisplayMode,
  createNode: (node: TimelineNode, index: number) => ReactNode,
) => {
    let tickContainerStyle: React.CSSProperties = {};
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

  return dates.map((date, dateIndex) => {
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const filteredNodeGroup = groupedNodes[key];

    const tickContainerMultiplier = filteredNodeGroup ? 1 : 0.25;
    const tickContainerSize = DEFAULT_TICK_CONTAINER_SIZE * tickContainerMultiplier;
    tickContainerStyle = {
      ...tickContainerStyle,
      height: `${tickContainerSize}vh`,
    };

    return (
      <div key={dateIndex} className='tick-container' style={tickContainerStyle}>
        <div className='tick-label'
          style={tickLabelStyle}>
          {date.toLocaleString('default', { month: 'short', year: 'numeric' })}
        </div>
        <div className='tick-dot'></div>
        <div className='node-group-container'>
          {filteredNodeGroup && filteredNodeGroup.nodes.map((node, index) => {
            const nodeIndex = filteredNodeGroup.indices[index];
            return createNode(node, nodeIndex);
          })}
        </div>
      </div>
    )
  });
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
  const groupedNodes = groupNodesByDate(filteredNodes);
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
            onMouseLeave={handleMouseLeave}
            style={{ width: '50vw' }}>
            <h3 className='node-title'>{node.title}</h3>
            {selectedNodeBehavior()}
          </div>
        }

        nodeContainerStyle = {
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
          top: `${monthIndex * DEFAULT_TICK_CONTAINER_SIZE + verticalOffset}vh`,
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
          left: '3px', // Adjusted to line up with the tick dots
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

  const createTimeLineStyle = () => {
    let timelineStyle: React.CSSProperties = {};
    switch (displayMode) {
      case 'minimal-left': {
        timelineStyle = {
          ...timelineStyle,
          margin: 'auto',
          maxWidth: '800px',
        };
        break;
      }
      case 'minimal':
      case 'default':
      default:
        break;
    }

    return timelineStyle;
  }

  return (
    <div className='timeline-container' style={createTimeLineStyle()}>
      {createTimelineLine()}
      {generateTicks(groupedNodes, dates, displayMode, createNode)}
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
