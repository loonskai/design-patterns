import React from 'react';

type Props = {
  color: string;
  bold: boolean;
  underline: boolean;
  italic: boolean;
  updateColor(event: React.FormEvent<HTMLInputElement>): void;
  updateFontWeight(event: React.FormEvent<HTMLInputElement>): void;
  updateItalic(event: React.FormEvent<HTMLInputElement>): void;
  updateUnderline(event: React.FormEvent<HTMLInputElement>): void;
}

export default function EditorToolbar({
  color,
  bold,
  underline,
  italic,
  updateColor, 
  updateItalic, 
  updateFontWeight, 
  updateUnderline 
}: Props): JSX.Element {
  return <div>
    <div>
      <label htmlFor="text-color">Text Color:</label>
      <input 
        id="text-color" 
        type="color" 
        value={color} 
        onChange={updateColor} 
      />
    </div>
    <div>
      <label htmlFor="italic">Italic</label>
      <input 
        id="italic" 
        type="checkbox" 
        checked={italic} 
        onChange={updateItalic} 
      />
    </div>
    <div>
      <label htmlFor="bold">Bold</label>
      <input 
        id="bold" 
        type="checkbox" 
        checked={bold} 
        onChange={updateFontWeight} 
      />
    </div>
    <div>
      <label htmlFor="underline">Underline</label>
      <input 
        id="underline" 
        type="checkbox" 
        checked={underline} 
        onChange={updateUnderline} 
      />
    </div>
  </div>;
}
