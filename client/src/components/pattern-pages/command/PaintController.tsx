import React from 'react';

type Props = {
  strokeStyle: string;
  lineWidth: number;
  onColorChange(event: React.FormEvent<HTMLInputElement>): void;
  onLineWidthChange(event: React.FormEvent<HTMLInputElement>): void;
}

export default function ColorPicker({ strokeStyle, lineWidth, onColorChange, onLineWidthChange }: Props): JSX.Element {
  return <div>
    <input type="color" value={strokeStyle} onChange={onColorChange} />
    <div>
      <span>{lineWidth}</span>
      <input 
        type="range"
        value={lineWidth}
        onChange={onLineWidthChange} 
        min={1} 
        max={10} 
      />
    </div>
  </div>;
}
