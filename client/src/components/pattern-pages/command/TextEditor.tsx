import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import sanitizeHtml from 'sanitize-html';
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

  return inlineString ? `<span style="${inlineString}">${content}</span>` : content;
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
  
  const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    const selection = window?.getSelection();
    if (selection?.toString()) {
      let { startOffset, endOffset } = selection.getRangeAt(0);

      const anchorElement = selection?.anchorNode?.parentElement;
      const focusElement = selection?.focusNode?.parentElement;
      console.log('anchorElement', anchorElement);
      console.log('focusElement', focusElement);

      const containerNode = selection.getRangeAt(0).commonAncestorContainer;
      const containerElement = containerNode.nodeType === 1 ? containerNode : containerNode.parentNode;
      let offset = 0;

      if (containerElement && containerElement.hasChildNodes()) {
        for (let i = 0; containerElement.childNodes.length > i; i++) {
          const childNode = containerElement.childNodes[i] as any;
          // Won't execute as all items are span
          if (childNode.nodeType === document.TEXT_NODE) {
            if ((offset + childNode.length) > startOffset) {
              break;
            }
            offset = offset + childNode.length;
          }

          if (childNode.nodeType === document.ELEMENT_NODE) {
            if ((offset + childNode.textContent.length) > startOffset) {
              break;
            }   
            offset = offset + childNode.textContent.length;
          }
        }
      }

      startOffset = startOffset + offset;
      endOffset = endOffset + offset;
      console.log('startOffset', startOffset);
      console.log('endOffset', endOffset);
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
