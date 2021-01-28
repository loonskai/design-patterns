import React, { useEffect, useState } from 'react';
import { StorageSingleton } from '../../patterns/creational/singleton';
import { JSONStringDebugger } from '../../components/pattern-pages/singleton/JSONStringDebugger';

export default function SingletonPage(): JSX.Element {
  const [_, setUpdated] = useState({});
  const [newData, setNewData] = useState<string>('{ "property": "value" }');

  const storageFirst = StorageSingleton.getInstance();
  const storageSecond = StorageSingleton.getInstance();

  const onClickFirst = () => {
    storageFirst.setData(newData);
    setUpdated({});
  };

  const onClickSecond = () => {
    storageSecond.setData(newData);
    setUpdated({});
  };

  useEffect(() => {
    /* Check if both instances are actually the same */
    console.log(storageFirst.symbol === storageSecond.symbol);
  }, []);

  return (
    <div>
      <h1>Singleton</h1>
      <textarea name="db" id="db" cols={30} rows={10} value={newData} onChange={(e) => setNewData(e.target.value)}/>
      <div>
        <button onClick={onClickFirst}>Update data in the 1st instance</button>
      </div>
      <div>
        <button onClick={onClickSecond}>Update data in the 2st instance</button>
      </div>
      <JSONStringDebugger name="1st instance" data={storageFirst.getData()} />
      <JSONStringDebugger name="2nd instance" data={storageSecond.getData()} />
    </div>
  );
}
