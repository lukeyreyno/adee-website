import React, {useEffect, useState} from 'react';
import './button-group.css';

interface ButtonData {
  label: string;
  onClick: () => void;
}

type ButtonGroupType = 'select' | 'default';

interface ButtonGroupProps {
  buttons: ButtonData[];
  buttonType: ButtonGroupType;
  defaultSelected?: number[];
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({buttons, buttonType, defaultSelected}) => {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  useEffect(() => {
    if (defaultSelected !== undefined) {
      if (selectedNode !== null) {
        return;
      }

      if (buttonType === 'select' && defaultSelected.length >= 1) {
        setSelectedNode(defaultSelected[0]);
      }
    }
  }, [buttonType, defaultSelected, selectedNode]);

  return (
    <div className="button-group">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => {
            button.onClick();
            if (buttonType === 'select') {
              setSelectedNode(index);
            }
          }}
          className={selectedNode === index ? 'button-selected' : 'button-default'}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export {type ButtonData, ButtonGroup};
