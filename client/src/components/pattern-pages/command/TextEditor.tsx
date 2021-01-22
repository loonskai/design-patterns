import React, { useState, useRef, MutableRefObject } from 'react';
import sanitizeHtml from 'sanitize-html';
import EditorToolbar from './EditorToolbar';
import { useEditor } from './hooks';
import './TextEditor.css';
import { Invoker } from '../../../patterns/behavioral/command';

export default function TextEditor(): JSX.Element {
  const inputRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [text, setText] = useState('');
  const { html, styles, mouseUpListener } = useEditor(text, inputRef.current);
  const { textProperties, setProperty, toggleProperty } = styles;

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.innerText);
  };

  return <div>
    <EditorToolbar
      {...textProperties}
      updateFontWeight={toggleProperty.bold}
      updateItalic={toggleProperty.italic}
      updateUnderline={toggleProperty.underline}
      updateColor={(e: React.ChangeEvent<HTMLInputElement>) => setProperty.color(e.target.value)}
    />
    <div 
      id="text"
      className="text-input"
      onInput={handleInput}
      onMouseUp={mouseUpListener}
      ref={inputRef}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(html, {
          allowedTags: ['span'],
          allowedAttributes: {
            span: ['style']
          }
        })
      }}
    />
  </div>;
}
