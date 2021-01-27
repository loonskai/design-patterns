import React, { useEffect, useState, Suspense } from 'react';
import { GUIAbstractFactory, PlatformButton, PlatformCheckbox } from '../../patterns/creational/abstract-factory';
import { WinUIFactory } from '../../patterns/creational/abstract-factory/WinUIFactory';
import { MacUIFactory } from '../../patterns/creational/abstract-factory/MacUIFactory';

const PLATFORM_TYPES = {
  MACOS: 'MACOS',
  WINDOWS: 'WINDOWS',
};

type Sandbox = {
  button: PlatformButton;
  checkbox: PlatformCheckbox;
}

// TODO: Lazy load components by componentPath
export default function AbstractFactoryPage(): JSX.Element {
  const [platform, setPlatform] = useState(PLATFORM_TYPES.MACOS);
  const [factory, setFactory] = useState<GUIAbstractFactory | null>(null);
  const [sandboxes, setSandboxes] = useState<Sandbox[]>([]);

  useEffect(() => {
    switch (platform) {
    case PLATFORM_TYPES.MACOS: {
      setFactory(new MacUIFactory());
      break;
    }
    case PLATFORM_TYPES.WINDOWS: {
      setFactory(new WinUIFactory());
      break;
    }
    default: throw new Error('Unsupported platform');
    }
  }, [platform]);

  const createUI = () => {
    if (!factory) return;
    setSandboxes([...sandboxes, {
      button: factory.createButton(),
      checkbox: factory.createCheckbox()
    }]);
  };

  return (
    <div>
      <h1>Abstract Factory</h1>
      <div>
        <select name="platforms" id="platform-list" onChange={(e) => setPlatform(e.target.value)}>
          <option value={PLATFORM_TYPES.MACOS}>{PLATFORM_TYPES.MACOS}</option>
          <option value={PLATFORM_TYPES.WINDOWS}>{PLATFORM_TYPES.WINDOWS}</option>
        </select>
        <button type="button" onClick={createUI} defaultValue={platform}>Create UI</button>
      </div>
      <div>
        {sandboxes.map(({ button, checkbox }) => {
          const Button = React.lazy(() => import(button.componentPath));
          return (
            <Suspense fallback={<div>Loading...</div>}>
              <label htmlFor={checkbox.id}>{checkbox.getLabel()}</label>
              <input type="checkbox" id={checkbox.id} />
              <Button />
              {/* <button style={button.getStyles()} onClick={button.onClick}>
                {button.getText()}
              </button> */}
            </Suspense>
          );
        })}
      </div>
    </div>
  );
}
