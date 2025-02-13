import React, { useState } from "react";

interface TimelineNode {
  id: number;
  title: string;
  description: string;
  date: Date;
}

interface TimelineProps {
  nodes: TimelineNode[];
}

const generateTicks = (nodes: TimelineNode[]) => {
  const dates = nodes.map(node => node.date);
  const minDate = new Date(dates.reduce((min, date) => Math.min(min, date.getTime()), Infinity));
  const maxDate = new Date(dates.reduce((max, date) => Math.max(max, date.getTime()), -Infinity));

  console.log(minDate, maxDate);
  
  const ticks: Date[] = [];
  const currentDate = new Date(minDate);

  while (currentDate <= maxDate) {
    // Add a new Date object to the ticks array
    ticks.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return {
    dates: ticks,
    elements: ticks.map((date, index) => (
      <div key={`${date.getTime()}-${index}`} className="relative flex flex-col items-center w-full">
        <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-600 text-sm">
          {date.toLocaleString('default', { month: 'short', year: 'numeric' })}
        </div>
        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
      </div>
    ))
  };
};

const VerticalTimeline: React.FC<TimelineProps> = ({ nodes }) => {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const {dates, elements: ticks} = generateTicks(nodes);

  return (
    <div className="flex flex-col items-center relative w-full p-4">
      <div className="absolute w-1 bg-gray-300 h-full left-1/2 transform -translate-x-1/2"></div>
      {ticks}
      {nodes.map((node) => (
        <div
          style={{ top: `${(node.date.getTime() - dates[0].getTime()) / (1000 * 60 * 60 * 24 * 30) * 40}px` }}
          className="flex flex-col items-center w-full mb-6 cursor-pointer absolute"
          onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
        >
          <div className="relative z-10 w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-md"></div>
          <div className="mt-2 p-2 text-center bg-white shadow-md rounded-lg w-60">
            <h3 className="font-semibold">{node.title}</h3>
            {selectedNode === node.id && <p className="mt-2 text-sm text-gray-600">{node.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export {VerticalTimeline};
