import React from 'react';

type Props = {
  // strokeStyle: string;
  // lineWidth: number;
  onColorChange(event: React.FormEvent<HTMLInputElement>): void;
  // onLineWidthChange(event: React.FormEvent<HTMLInputElement>): void;
}

export default function EditorToolbar({ onColorChange /* strokeStyle, lineWidth, , onLineWidthChange */ }: Props): JSX.Element {
  return <div>
    <div>
      <label htmlFor="text-color">Text Color:</label>
      <input id="text-color" type="color" onChange={onColorChange} />
    </div>
    <div>
      <label htmlFor="italic">Italic</label>
      <input id="italic" type="checkbox"/>
    </div>
    <div>
      <label htmlFor="bold">Bold</label>
      <input id="bold" type="checkbox"/>
    </div>
    {/* 
    <div>
      <span>{lineWidth}</span>
      <input 
        type="range"
        value={lineWidth}
        onChange={onLineWidthChange} 
        min={1} 
        max={10} 
      /> 
    </div>*/}
  </div>;
}
