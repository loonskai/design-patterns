import { v4 as uuidv4 } from 'uuid';
import { GUIAbstractFactory, PlatformCheckbox, PlatformButton } from './index';

class MacCheckbox implements PlatformCheckbox {
  public id = uuidv4();

  public getStyles() {
    return {};
  }

  public getLabel() {
    return 'Mac Checkbox';
  }
}

class MacButton implements PlatformButton {
  public id = uuidv4();
  public componentPath = 'components/pattern-pages/abstract-factory/MacButton.tsx'

  public onClick() {
    console.log('this is mac');
  }

  public getStyles() {
    return {
      textDecoration: 'none',
      fontFamily: 'LucidaGrande',
      color: 'black',
      fontSize: '11px',
      padding: '1px 7px',
      border: '1px solid #9C9C9C',
      margin: '2px 2px',
      display: 'inline-block',
      backgroundImage: `-webkit-linear-gradient(
       #ffffff 0%, #F6F6F6  30%, 
       #F3F3F3 45%, #EDEDED  60%, 
       #eeeeee 100%)`,
      borderRadius: '3px',
      cursor: 'default',
      boxShadow: '0px 0px 1px rgba(0,0,0,0.20)'
    };
  }

  public getText() {
    return 'Mac Button';
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
