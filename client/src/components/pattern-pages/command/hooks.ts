import { useState, useEffect } from 'react';
import {
  textToTree,
  treeToHtml,
  getSelectionRangeValues,
  getCommonSelectedCharsStyle,
  transformStyleAST,
  transformColorStyleAST,
  replaceCaret,
  SelectionRange
} from './utils';

type InitialStyleValues = {
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

const initialTextProperties = {
  color: '#000000',
  bold: false,
  italic: false,
  underline: false
};

const useTextStyles = (initialValues: InitialStyleValues) => {
  const [color, setColor] = useState(initialValues.color);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  return {
    textProperties: {
      color,
      bold,
      italic,
      underline
    },
    setProperty: {
      color: setColor,
      bold: setBold,
      italic: setItalic,
      underline: setUnderline
    },
    toggleProperty: {
      bold: () => setBold(!bold),
      italic: () => setItalic(!italic),
      underline: () => setUnderline(!underline)
    }
  };
};

export const useEditor = (text: string, element: HTMLElement) => {
  const [ast, setAST] = useState(textToTree(text));
  const [html, setHtml] = useState(treeToHtml(ast));
  const [selectionRange, setSelectionRange] = useState<SelectionRange | null>(null);
  const styles = useTextStyles(initialTextProperties);
  const { textProperties, setProperty } = styles;

  useEffect(() => {
    setAST(textToTree(text, ast, textProperties));
  }, [text]);

  useEffect(() => {
    setHtml(treeToHtml(ast));
  }, [ast]);

  useEffect(() => {
    if (selectionRange) return;
    if (element) {
      replaceCaret(element);
    }
  });

  useEffect(() => {
    if (!selectionRange) return;
    const transformedAST = transformColorStyleAST(ast, { value: textProperties.color, selectionRange });
    setAST(transformedAST);
  }, [textProperties.color]);

  useEffect(() => {
    if (!selectionRange) return;
    const transformedAST = transformStyleAST(ast, {
      value: textProperties.bold,
      property: 'bold', 
      selectionRange
    });
    setAST(transformedAST);
  }, [textProperties.bold]);

  useEffect(() => {
    if (!selectionRange) return;
    const transformedAST = transformStyleAST(ast, {
      value: textProperties.italic,
      property: 'italic', 
      selectionRange 
    });
    setAST(transformedAST);
  }, [textProperties.italic]);

  useEffect(() => {
    if (!selectionRange) return;
    const transformedAST = transformStyleAST(ast, {
      value: textProperties.underline,
      property: 'underline', 
      selectionRange, 
    });
    setAST(transformedAST);
  }, [textProperties.underline]);

  useEffect(() => {
    if (!selectionRange) {
      setProperty.bold(false);
      setProperty.italic(false);
      setProperty.underline(false);
    } else {
      const commonCharStyles = getCommonSelectedCharsStyle(ast, selectionRange);
      if (commonCharStyles.isBold) setProperty.bold(true);
      if (commonCharStyles.isItalic) setProperty.italic(true);
      if (commonCharStyles.isUnderline) setProperty.underline(true);
      if (commonCharStyles.sameColor) setProperty.color(commonCharStyles.sameColor as string);
    }
  }, [selectionRange]);

  return { 
    html, 
    styles, 
    mouseUpListener: () => {
      setSelectionRange(getSelectionRangeValues(element));
    } 
  };
};
