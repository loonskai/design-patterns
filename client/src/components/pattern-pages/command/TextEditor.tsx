import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import sanitizeHtml from 'sanitize-html';
import EditorToolbar from './EditorToolbar';
import './TextEditor.css';
import { Invoker } from '../../../patterns/behavioral/command';

type SelectionRange = {
  start: number;
  end: number;
}

const ast = [
  {
    value: 'H',
    style: ['bold', 'color-#D53030']
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
    style: ['bold', 'underline']
  },
  {
    value: ' ',
    style: ['underline']
  },
  {
    value: 'w',
    style: ['underline']
  },
  {
    value: 'o',
    style: ['underline', 'italic']
  },
  {
    value: 'r',
    style: ['italic']
  },
  {
    value: 'l',
    style: []
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
  const { style: charStyles } = chars[0];
  
  const inlineEntries = Array.isArray(charStyles) 
    ? charStyles.reduce((acc, style) => {
      switch (style) {
      case 'bold': return [...acc, ['font-weight', 'bold']];
      case 'italic': return [...acc, ['font-style', 'italic']];
      case 'underline': return [...acc, ['text-decoration', 'underline']];
      default: {
        if (/^color-\#[0-9A-Fa-f]{6}$/.test(style)) {
          const hex = style.match(/\#[0-9A-Fa-f]{6}$/);
          return [...acc, ['color', hex]];
        }
        return acc;
      }}
    }, [] as any) : [];

  const inlineString = inlineEntries
    .map(([attribute, value]: string[]) => `${attribute}:${value};`)
    .join('');
  const inlineStyleString = inlineString ? ` style="${inlineString}"` : '';

  return `<span${inlineStyleString}>${content}</span>`;
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
  const [html, setHtml] = useState(treeToHtml(ast));
  const [selectionRange, setSelectionRange] = useState<SelectionRange | null>(null);
  const inputRef = useRef() as MutableRefObject<HTMLDivElement>;

  const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    const selection = window?.getSelection();
    if (selection?.toString()) {
      const { 
        startContainer,
        endContainer,
        startOffset, 
        endOffset 
      } = selection.getRangeAt(0);

      const containerElement = inputRef.current;
      const startNode = startContainer.parentNode;
      const endNode = endContainer.parentNode;

      let totalOffset = 0;
      let start = 0;
      let end = 0;
      let startReached = false;

      if (containerElement && containerElement.hasChildNodes()) {
        for (let i = 0; containerElement.childNodes.length > i; i++) {
          const childNode = containerElement.childNodes[i] as any;
          const { length } = childNode.textContent;
          const isStartNode = childNode === startNode;
          const isEndNode = childNode === endNode;

          if (isStartNode && !startReached) {
            startReached = true;
            start = totalOffset + startOffset;
          }

          if (isEndNode) {
            end = totalOffset + endOffset;
            break;
          }

          totalOffset += length;
        }

        setSelectionRange({ start, end });
      }
    }
  };

  return <div>
    <EditorToolbar
      onColorChange={onColorChange}
    />
    <div 
      id="text"
      className="text-input"
      onMouseUp={handleMouseUp}
      ref={inputRef}
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(html, {
          allowedTags: ['span'],
          allowedAttributes: {
            span: ['style']
          }
        })
      }}
      contentEditable
      suppressContentEditableWarning
    />
  </div>;
}
