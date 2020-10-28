import React from 'react';
import { GUIAbstractFactory, PlatformCheckbox, PlatformButton } from './index';

class WinCheckbox implements PlatformCheckbox {
  paint() {
    console.log('paint win checkbox');
  }
}

class WinButton implements PlatformButton {
  handleClick() {
    console.log('this is win');
  }

  paint() {
    return <button>WinButton</button>;
  }
}

export class WinUIFactory implements GUIAbstractFactory {
  public createButton(): WinButton {
    return new WinButton();
  }

  public createCheckbox(): WinCheckbox {
    return new WinCheckbox();
  }
}
