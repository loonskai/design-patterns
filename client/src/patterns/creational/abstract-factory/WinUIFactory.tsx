import { v4 as uuidv4 } from 'uuid';
import { GUIAbstractFactory, PlatformCheckbox, PlatformButton } from './index';

class WinCheckbox implements PlatformCheckbox {
  public id = uuidv4();

  public getStyles() {
    return {
      backgroundColor: 'red'
    };
  }

  public getLabel() {
    return 'Win Checkbox';
  }
}

class WinButton implements PlatformButton {
  public id = uuidv4();
  public componentPath = '../../components/pattern-pages/abstract-factory/WinButton.tsx'

  public onClick() {
    console.log('this is win');
  }

  public getStyles() {
    return {
      border: '2px solid red'
    };
  }

  public getText() {
    return 'Windows Button';
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
