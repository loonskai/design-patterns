type Size = {
  width: number;
  height: number;
}

type Styles = {
  margin?: string;
  width?: string;
  height?: string;
  background?: string;
  border?: string;
  borderRadius?: string;
}

interface Builder {
  setSize(size: Size): Builder;
  setBackground(value: string): Builder;
  setBorder(value: string): Builder;
  setUserAgentStyles(): Builder;
  build(): Styles;
}

export class ElementStyleBuilder implements Builder {
  private width = 0;
  private height = 0;
  private background?: string;
  private border?: string;
  private borderRadius = 0;

  setSize(size: Size): Builder {
    this.width = size.width;
    this.height = size.height;
    return this;
  }

  setBackground(value: string): Builder {
    if (this.height < 20) {
      this.background = '#ffffff';
    } else {
      this.background = value;
    }
    return this;
  }

  setBorder(value: string): Builder {
    this.border = value;
    return this;
  }

  setUserAgentStyles(): Builder {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (isChrome) {
      this.borderRadius = 30;
    } 
    return this;
  }

  build(): Styles {
    return {
      margin: '10px',
      width: `${this.width}px`,
      height: `${this.height}px`,
      background: this.background,
      border: this.border || 'none',
      borderRadius: `${this.borderRadius}px`
    };
  }
}
