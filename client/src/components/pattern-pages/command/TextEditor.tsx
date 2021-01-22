import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import EditorToolbar from './EditorToolbar';
import {
  textToTree,
  treeToHtml,
  getSelectionRangeValues,
  isColorStyle,
  getColorHEXFromStyle,
  updateASTStyles,
  updateASTColorStyles,
  replaceCaret,
  getSanitized
} from './utils';
import './TextEditor.css';
import { Invoker } from '../../../patterns/behavioral/command';

type SelectionRange = {
  start: number;
  end: number;
}

const DEFAULT_COLOR = '#000000';

export default function TextEditor(): JSX.Element {
  const inputRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [text, setText] = useState('');
  const [ast, setAST] = useState(textToTree(text));
  const [html, setHtml] = useState(treeToHtml(ast));
  const [selectionRange, setSelectionRange] = useState<SelectionRange | null>(null);

  useEffect(() => {
    setAST(textToTree(text, ast, {
      color,
      bold,
      italic,
      underline
    }));
  }, [text]);

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
      }
    }
  }, [selectionRange]);

  useEffect(() => {
    if (selectionRange) return;
    replaceCaret(inputRef.current);
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.innerText);
  };

  const handleMouseUp = () => {
    setSelectionRange(getSelectionRangeValues(inputRef.current));
  };

  const updateColor = (event: React.ChangeEvent<HTMLInputElement>) => setColor(event.target.value);
  const updateItalic = () => setItalic(!italic);
  const updateUnderline = () => setUnderline(!underline);
  const updateFontWeight = () => setBold(!bold);

  useEffect(() => {
    if (!selectionRange) return;
    const updatedAST = updateASTColorStyles(ast, {
      start: selectionRange.start,
      end: selectionRange.end,
      value: color
    });
    setAST(updatedAST);
  }, [color]);

  useEffect(() => {
    if (!selectionRange) return;
    const updatedAST = updateASTStyles(ast, {
      value: bold,
      property: 'bold', 
      start: selectionRange.start, 
      end: selectionRange.end 
    });
    setAST(updatedAST);
  }, [bold]);

  useEffect(() => {
    if (!selectionRange) return;
    const updatedAST = updateASTStyles(ast, {
      value: italic,
      property: 'italic', 
      start: selectionRange.start, 
      end: selectionRange.end 
    });
    setAST(updatedAST);
  }, [italic]);

  useEffect(() => {
    if (!selectionRange) return;
    const updatedAST = updateASTStyles(ast, {
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
      onInput={handleInput}
      onMouseUp={handleMouseUp}
      ref={inputRef}
      dangerouslySetInnerHTML={getSanitized(html)}
      contentEditable
      suppressContentEditableWarning
    />
  </div>;
}
