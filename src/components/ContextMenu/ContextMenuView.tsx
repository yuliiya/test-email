import React from 'react';

export interface ContextMenuItem {
  label: string;
  onClick: () => void;
}

export interface ViewProps {
  visible: boolean;
  position: { x: number; y: number };
  items: ContextMenuItem[];
  onItemClick: (item: ContextMenuItem) => void;
}

export const ContextMenuView: React.FC<ViewProps> = ({ visible, position, items, onItemClick }) => {
  return visible ? (
    <ul className="absolute bg-white border border-gray-300 shadow-lg" style={{ top: position.y, left: position.x }}>
      {items.map((item) => (
        <li key={item.label} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => onItemClick(item)}>
          {item.label}
        </li>
      ))}
    </ul>
  ) : null;
};
