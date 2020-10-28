/* eslint-disable max-classes-per-file */
interface PlatformButton {
  handleClick(): void;
}

class WinButton implements PlatformButton {
  // eslint-disable-next-line class-methods-use-this
  handleClick() {
    console.log('this is win');
  }
}

class MacButton implements PlatformButton {
  handleClick() {
    console.log('this is mac');
  }
}

interface PlatformCheckbox {
  paint(): void;
}

class WinCheckbox implements PlatformCheckbox {
  paint() {
    console.log('paint win checkbox');
  }
}

class MacCheckbox implements PlatformCheckbox {
  paint() {
    console.log('paint mac checkbox');
  }
}

export interface GUIAbstractFactory {
  createButton(): PlatformButton
  createCheckbox(): PlatformCheckbox
}

export class WinUIFactory implements GUIAbstractFactory {
  public createButton(): WinButton {
    return new WinButton();
  }

  public createCheckbox(): WinCheckbox {
    return new WinCheckbox();
  }
}

export class MacUIFactory implements GUIAbstractFactory {
  public createButton(): MacButton {
    return new MacButton();
  }

  public createCheckbox(): MacCheckbox {
    return new MacCheckbox();
  }
}
