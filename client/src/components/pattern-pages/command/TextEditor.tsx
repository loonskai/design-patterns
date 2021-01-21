import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import sanitizeHtml from 'sanitize-html';
import EditorToolbar from './EditorToolbar';
import './TextEditor.css';
import { Invoker } from '../../../patterns/behavioral/command';

type SelectionRange = {
  start: number;
  end: number;
}

const DEFAULT_COLOR = '#000000';

const INITIAL_AST = [
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

const isColorStyle = (style: string): boolean => /^color-\#[0-9A-Fa-f]{6}$/.test(style);
const getColorHEXFromStyle = (style: string): string => {
  const [ hex ] = style.match(/\#[0-9A-Fa-f]{6}$/) || [];
  return hex;
}; 

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
        if (isColorStyle(style)) {
          return [...acc, ['color', getColorHEXFromStyle(style)]];
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

type UpdateASTOptions = {
  value: boolean;
  property: 'bold' | 'italic' | 'underline';
  start: number;
  end: number;
}

const updateAST = (ast: Char[], { value, property, start, end }: UpdateASTOptions): Char[] => {
  const updatedAST = [...ast].map((char, idx) => {
    if (idx >= start && idx < end) {
      return {
        value: char.value,
        style: value 
          ? [...new Set([...char.style, property])]
          : char.style.filter(charStyle => charStyle !== property)
      };
    }
    return char;
  });
  return updatedAST;
};
 
export default function TextEditor(): JSX.Element {
  const inputRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [ast, setAST] = useState(INITIAL_AST);
  const [html, setHtml] = useState(treeToHtml(ast));
  const [selectionRange, setSelectionRange] = useState<SelectionRange | null>(null);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  useEffect(() => {
    setHtml(treeToHtml(ast));
  }, [ast]);

  useEffect(() => {
    if (!selectionRange) {
      setBold(false);
      setItalic(false);
      setUnderline(false);
    } else {
      let isBold = undefined as boolean | undefined;
      let isItalic = undefined as boolean | undefined;
      let isUnderline = undefined as boolean | undefined;
      let sameColor = undefined as string | boolean | undefined;

      const charsASTSelected = ast.slice(selectionRange.start, selectionRange.end);
      charsASTSelected.forEach(char => {
        if (isBold !== false && char.style.includes('bold')) {
          isBold = true;
        } else {
          isBold = false;
        }

        if (isItalic !== false && char.style.includes('italic')) {
          isItalic = true;
        } else {
          isItalic = false;
        }

        if (isUnderline !== false && char.style.includes('underline')) {
          isUnderline = true;
        } else {
          isUnderline = false;
        }

        // TODO: FIX BUG
        if (typeof sameColor === 'undefined') {
          sameColor = getColorHEXFromStyle(char.style.find(charStyle => isColorStyle(charStyle)) || '');
        } else {
          const currentCharColor = getColorHEXFromStyle(char.style.find(charStyle => isColorStyle(charStyle)) || '');
          if (sameColor !== currentCharColor) {
            sameColor = false;
          }
        }
      });

      if (isBold) setBold(true);
      if (isItalic) setItalic(true);
      if (isUnderline) setItalic(true);
      if (sameColor) {
        setColor(sameColor as string);
      } else {
        setColor(DEFAULT_COLOR);
      }
    }
  }, [selectionRange]);

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
    } else {
      setSelectionRange(null);
    }
  };

  const updateColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const updateItalic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItalic(!italic);
  };

  const updateUnderline = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnderline(!underline);
  };

  const updateFontWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBold(!bold);
  };

  useEffect(() => {
    if (!selectionRange) return;
    const updatedAST = [...ast].map((char, idx) => {
      if (idx >= selectionRange.start && idx < selectionRange.end) {
        if (!char.style.some(charStyle => isColorStyle(charStyle))) {
          return {
            value: char.value,
            style: [...char.style, `color-${color}`]
          };
        }
        return {
          value: char.value,
          style: char.style.map(
            charStyle => isColorStyle(charStyle)
              ? charStyle.replace(/\#[0-9A-Fa-f]{6}/, color) 
              : charStyle
          )
        };
      }
      return char;
    });
    setAST(updatedAST);
  }, [color]);

  useEffect(() => {
    if (!selectionRange) return;
    const updatedAST = updateAST(ast, {
      value: bold,
      property: 'bold', 
      start: selectionRange.start, 
      end: selectionRange.end 
    });
    setAST(updatedAST);
  }, [bold]);

  useEffect(() => {
    if (!selectionRange) return;
    const updatedAST = updateAST(ast, {
      value: italic,
      property: 'italic', 
      start: selectionRange.start, 
      end: selectionRange.end 
    });
    setAST(updatedAST);
  }, [italic]);

  useEffect(() => {
    if (!selectionRange) return;
    const updatedAST = updateAST(ast, {
      value: underline,
      property: 'underline', 
      start: selectionRange.start, 
      end: selectionRange.end 
    });
    setAST(updatedAST);
  }, [underline]);

  return <div>
    <EditorToolbar
      color={color}
      bold={bold}
      underline={underline}
      italic={italic}
      updateColor={updateColor}
      updateFontWeight={updateFontWeight}
      updateItalic={updateItalic}
      updateUnderline={updateUnderline}
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
