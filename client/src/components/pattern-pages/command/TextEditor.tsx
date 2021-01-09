import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import EditorToolbar from './EditorToolbar';
import './TextEditor.css';
import { Invoker } from '../../../patterns/behavioral/command';

type SelectionRange = {
  selectionStart: number;
  selectionEnd: number;
}

function Text({ value }: { value: string }): JSX.Element {
  return <span style={{ color: 'red' }}>{value}</span>;
}

export default function TextEditor(): JSX.Element {
  const [observerRegistered, setObserverRegistered] = useState(false);
  const [text, setText] = useState('foo bar');
  const [selectionRange, setSelectionRange] = useState<SelectionRange | null>(null);
  const editableRef = useRef(null) as MutableRefObject<HTMLDivElement | null>;

  const observer = new MutationObserver((mutationList) => {
    mutationList.forEach(() => {
      if (editableRef.current) {
        console.log('editableRef.current.innerText', editableRef.current.innerText);
        setText(editableRef.current.innerText);
      }
    });
  });

  useEffect(() => {
    console.log('text',text);
  }, [text]);

  useEffect(() => {
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (editableRef.current && !observerRegistered) {
      observer.observe(editableRef.current, {
        subtree: true,
        characterData: true
      });
      setObserverRegistered(true);
    }
  }, [editableRef]);

  const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  
  const onMouseUp = (event: React.MouseEvent) => {
    const selection = window?.getSelection();
    if (selection?.toString()) {
      console.log(selection?.toString());
      const { startOffset, endOffset } = window?.getSelection()?.getRangeAt(0) || {};
      console.log(startOffset);
      console.log(endOffset);
    } else {
      console.log('clear');
    }
  };

  return <div>
    <EditorToolbar 
      onColorChange={onColorChange}
    />
    <div 
      // name="text" 
      id="text"
      className="text-input"
      // cols={30} 
      // rows={10}
      // onInput={onInput}
      onMouseUp={onMouseUp}
      ref={editableRef}
      contentEditable
      suppressContentEditableWarning
    >
      {text}
    </div>
  </div>;
}
