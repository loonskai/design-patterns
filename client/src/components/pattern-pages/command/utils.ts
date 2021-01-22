type TextToTreeOptions = {
  [key: string]: string | boolean; 
}

type UpdateASTOptions = {
  value: string | boolean;
  property: 'bold' | 'italic' | 'underline';
  selectionRange: SelectionRange;
}

type UpdateASTColorOptions = {
  value: string;
  selectionRange: SelectionRange;
}

type Char = {
  value: string;
  style: string[];
}

export type SelectionRange = {
  start: number;
  end: number;
}

const isColorStyle = (style: string): boolean => /^color-\#[0-9A-Fa-f]{6}$/.test(style);

const getColorHEXFromStyle = (style: string): string => {
  const [ hex ] = style.match(/\#[0-9A-Fa-f]{6}$/) || [];
  return hex;
}; 

export const isSameStyle = (style1: string[], style2: string[]) => {
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

export const createElement = (chars: Char[]) => {
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

export const textToTree = (
  text: string, 
  ast: Char[] | null = null, 
  properties: TextToTreeOptions = {}
): Char[] => {
  return text.split('').map((char, idx) => ast && ast[idx] 
    ? ast[idx] 
    : { 
      value: char, 
      style: properties 
        ? Object.keys(properties)
          .map((propKey) => {
            const propValue = properties[propKey];
            switch (propKey) {
            case 'color': return `color-${propValue}`;
            case 'bold': return propValue ? 'bold' : '';
            case 'italic': return propValue ? 'italic' : '';
            case 'underline': return propValue ? 'underline' : '';
            default: return '';
            }
          })
          .filter(prop => prop)
        : [] as string[] 
    }
  );
};

export const treeToHtml = (tree: Char[]) => {
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

export const transformStyleAST = (ast: Char[], { value, property, selectionRange }: UpdateASTOptions): Char[] => {
  const updatedAST = [...ast].map((char, idx) => {
    if (idx >= selectionRange.start && idx < selectionRange.end) {
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

export const transformColorStyleAST = (ast: Char[], { value, selectionRange } : UpdateASTColorOptions): Char[] => [...ast].map((char, idx) => {
  if (idx >= selectionRange.start && idx < selectionRange.end) {
    if (!char.style.some(charStyle => isColorStyle(charStyle))) {
      return {
        value: char.value,
        style: [...char.style, `color-${value}`]
      };
    }
    return {
      value: char.value,
      style: char.style.map(
        charStyle => isColorStyle(charStyle)
          ? charStyle.replace(/\#[0-9A-Fa-f]{6}/, value) 
          : charStyle
      )
    };
  }
  return char;
});

export const replaceCaret = (element: HTMLElement): void => {
  const target = document.createTextNode('');
  element.appendChild(target);

  const isTargetFocused = document.activeElement === element;
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    const selection = window.getSelection();
    if (selection !== null) {
      const range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    if (element instanceof HTMLElement) element.focus();
  }
};

export const getSelectionRangeValues = (containerElement: HTMLElement) => {
  const selection = window?.getSelection();
  if (!selection?.toString()) return null;

  const { 
    startContainer,
    endContainer,
    startOffset, 
    endOffset 
  } = selection.getRangeAt(0);
  const startNode = startContainer.parentNode;
  const endNode = endContainer.parentNode;

  let totalOffset = 0;
  let start = 0;
  let end = 0;
  let startReached = false;

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

  return { start, end };
};

export const getCommonSelectedCharsStyle = (ast: Char[], selectionRange: SelectionRange) => {
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

  return {
    isBold,
    isItalic,
    isUnderline,
    sameColor
  };
};
