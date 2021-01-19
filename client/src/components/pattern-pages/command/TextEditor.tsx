import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
// import sanitizeHtml from 'sanitize-html';
import EditorToolbar from './EditorToolbar';
import './TextEditor.css';
import { Invoker } from '../../../patterns/behavioral/command';

type SelectionRange = {
  selectionStart: number;
  selectionEnd: number;
}

const ast = [
  {
    value: 'H',
    style: ['bold']
  },
  {
    value: 'e',
    style: ['bold']
  },
  {
    value: 'l',
    style: ['bold']
  },
  {
    value: 'l',
    style: ['bold']
  },
  {
    value: 'o',
    style: ['bold', 'underscore']
  },
  {
    value: ' ',
    style: []
  },
  {
    value: 'w',
    style: ['underscore']
  },
  {
    value: 'o',
    style: ['underscore', 'italic']
  },
  {
    value: 'r',
    style: ['italic']
  },
  {
    value: 'l',
    style: ['italic']
  },
  {
    value: 'd',
    style: []
  },
];


const isSameStyle = (style1: string[], style2: string[]) => {
  if (!Array.isArray(style1) || !Array.isArray(style2) || style1.length !== style2.length) {
    return false;
  }

  const sorted1 = [...style1].sort();
  const sorted2 = [...style2].sort();

  for (let i = 0; i < sorted1.length; i++) {
    if (sorted1[i] !== sorted2[i]) return false;
  }

  return true;
};

type Char = {
  value: string;
  style: string[];
}

const createElement = (chars: Char[]) => {
  const content = chars.reduce((acc, char) => acc + char.value, '');
  const style = chars[0]?.style?.join(' ');

  return `<span${style ? ' class="' + style + '"' : ''}>${content}</span>`;
};


const treeToHtml = (tree: Char[]) => {
  const transBuffer = [] as Array<Char[]>;

  let buffer = [] as Char[];
  tree.forEach((char, idx) => {
    const lastInBuffer = buffer[buffer.length - 1];
    if (lastInBuffer) {
      const same = isSameStyle(lastInBuffer.style, char.style);
      if (same) {
        buffer.push(char);
      } else {
        transBuffer.push(buffer);
        buffer = [char];
      }
    } else {
      buffer.push(char);
    }
    
    if (idx === tree.length - 1) {
      transBuffer.push(buffer);
    }
  });

  return transBuffer.reduce((acc, chars) => {
    return acc + createElement(chars);
  }, '');
};

export default function TextEditor(): JSX.Element {
  const [observerRegistered, setObserverRegistered] = useState(false);
  // const [text, setText] = useState('foo bar');
  const [selectionRange, setSelectionRange] = useState<SelectionRange | null>(null);
  const editableRef = useRef(null) as MutableRefObject<HTMLDivElement | null>;

  const [html, setHtml] = useState('');

  console.log(treeToHtml(ast));
  // const observer = new MutationObserver((mutationList) => {
  //   mutationList.forEach(() => {
  //     if (editableRef.current) {
  //       console.log('editableRef.current.innerText', editableRef.current.innerText);
  //       setText(editableRef.current.innerText);
  //     }
  //   });
  // });

  // useEffect(() => {
  //   console.log('text',text);
  // }, [text]);

  // useEffect(() => {
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (editableRef.current && !observerRegistered) {
  //     observer.observe(editableRef.current, {
  //       subtree: true,
  //       characterData: true
  //     });
  //     setObserverRegistered(true);
  //   }
  // }, [editableRef]);

  const sendCommand = (command: string) => {
  };
  
  const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  const handleChange = (event: ContentEditableEvent) => {
    setHtml(event.target.value);
  };
  
  // const onMouseUp = (event: React.MouseEvent) => {
  //   const selection = window?.getSelection();
  //   if (selection?.toString()) {
  //     console.log(selection?.toString());
  //     const { startOffset, endOffset } = window?.getSelection()?.getRangeAt(0) || {};
  //     console.log(startOffset);
  //     console.log(endOffset);
  //   } else {
  //     console.log('clear');
  //   }
  // };

  return <div>
    <EditorToolbar 
      onColorChange={onColorChange}
    />
    <ContentEditable
      className="text-input"
      onChange={handleChange}
      html={html}
    />
    {/* <div 
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
    </div> */}
  </div>;
}
