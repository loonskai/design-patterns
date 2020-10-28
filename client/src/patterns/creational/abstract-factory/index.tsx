export interface PlatformButton {
  handleClick(): void;
  paint(): JSX.Element;
}

export interface PlatformCheckbox {
  paint(): void;
}

export interface GUIAbstractFactory {
  createButton(): PlatformButton
  createCheckbox(): PlatformCheckbox
}




