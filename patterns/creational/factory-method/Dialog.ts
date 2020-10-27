abstract class Dialog {
  /* Factory method */
  public abstract createButton(): Button;
  /** 
   * Creator shares some common business logic
   * that relies on the objectes returned by factory method
   */
  public renderWindow() {
    /* Create an object by calling factory method */
    const button = this.createButton();
    /* Use the object created */
    button.onClick(() => {
      console.log('Close Dialog');
    });
    button.render();
  }
}

class MobileDialog extends Dialog {
  /** 
   * This method still uses abstract Button type
   * so the Dialog stays independent of concrete Button type
   */
  public createButton(): Button {
    return new MobileButton();
  }
}

class WebDialog extends Dialog {
  public createButton() {
    return new WebButton();
  }
}

interface Button {
  render(): void;

  click(): void;

  onClick(callback: (params: any) => void): void;
}

class MobileButton implements Button {
  public render() {
    console.log('Render MobileButton');
  }

  public click() {
    console.log('Default click handler');
  }

  public onClick(callback) {
    this.click = callback;
  }
}

class WebButton implements Button {
  public render() {
    console.log('Render WebButton');
  }

  public click() {
    console.log('Default click handler');
  }

  public onClick(callback) {
    this.click = callback;
  }
}

/* Example */
function initApp(dialogCreator: Dialog) {
  dialogCreator.renderWindow();
  const button = dialogCreator.createButton();
  button.onClick(() => {
    console.log('Custom click handler');
  });
  button.click();
}

initApp(new WebDialog());
initApp(new MobileDialog());
