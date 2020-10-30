type Size = {
  width: number,
  height: number
}

type Styles = {
  width?: string;
  height?: string;
  background?: string;
  border?: string;
}

interface Builder {
  setSize(size: Size): Builder
  setBackground(value: string): Builder
  setBorder(value: string): Builder
  build(): Styles;
}

export class ElementStyleBuilder implements Builder {
  private width?: string;
  private height?: string;
  private background?: string;
  private border?: string;

  setSize(size: Size): Builder {
    this.width = `${size.width}px`;
    this.height = `${size.height}px`;
    return this;
  }

  setBackground(value: string): Builder {
    this.background = value;
    return this;
  }

  setBorder(value: string): Builder {
    this.border = value;
    return this;
  }

  build(): Styles {
    return {
      width: this.width,
      height: this.height,
      background: this.background,
      border: this.border
    };
  }
}
