import React, { useEffect, useState } from 'react';
import { GUIAbstractFactory, WinUIFactory, MacUIFactory } from '../patterns/creational/abstract-factory';

const PLATFORM_TYPES = {
  MACOS: 'MACOS',
  WINDOWS: 'WINDOWS',
};

export default function AbstractFactoryPage(): JSX.Element {
  const [platform, setPlatform] = useState(PLATFORM_TYPES.MACOS);
  const [factory, setFactory] = useState<GUIAbstractFactory | null>(null);

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
  }, []);

  const createUI = () => {
    const newButton = factory?.createButton();
    newButton?.handleClick();
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
    </div>
  );
}
