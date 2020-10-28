import React from 'react';
import { GUIAbstractFactory, PlatformCheckbox, PlatformButton } from './index';

export class MacCheckbox implements PlatformCheckbox {
  paint() {
    console.log('paint mac checkbox');
  }
}

class MacButton implements PlatformButton {
  handleClick() {
    console.log('this is mac');
  }

  paint() {
    return <button>MacButton</button>;
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
