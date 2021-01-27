type Styles = {
  backgroundColor?: string;
  textDecoration?: string;
  fontFamily?: string;
  color?: string;
  fontSize?: string;
  padding?: string;
  border?: string;
  margin?: string;
  display?: string;
  backgroundImage?: string;
  borderRadius?: string;
  cursor?: string;
  boxShadow?: string;
}

export interface PlatformButton {
  id: string;
  componentPath: string;
  onClick(): void;
  getStyles(): Styles;
  getText(): string;
}

export interface PlatformCheckbox {
  id: string;
  getStyles(): Styles;
  getLabel(): string;
}

export interface GUIAbstractFactory {
  createButton(): PlatformButton
  createCheckbox(): PlatformCheckbox
}




