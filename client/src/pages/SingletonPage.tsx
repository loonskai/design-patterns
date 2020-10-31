import React, { useEffect, useState } from 'react';
import { DatabaseSingleton } from '../patterns/creational/singleton';
import { JSONStringDebugger } from '../components/pattern-pages/singleton/JSONStringDebugger';

export default function SingletonPage(): JSX.Element {
  const [_, setUpdated] = useState({});
  const [newData, setNewData] = useState<string>('');
  const firstInstance = DatabaseSingleton.getInstance();
  const secondInstance = DatabaseSingleton.getInstance();

  useEffect(() => {
    console.log(firstInstance.symbol === secondInstance.symbol);
  }, []);

  return (
    <div>
      <h1>Singleton</h1>
      <textarea name="db" id="db" cols={30} rows={10} value={newData} onChange={(e) => setNewData(e.target.value)}/>
      <button onClick={() => {
        firstInstance.setData(newData);
        setUpdated({});
      }}>Update data in the 1st instance</button>
      <button onClick={() => {
        secondInstance.setData(newData);
        setUpdated({});
      }}>Update data in the 2st instance</button>
      <JSONStringDebugger name="1st instance" data={firstInstance.getData()} />
      <JSONStringDebugger name="2nd instance" data={secondInstance.getData()} />
    </div>
  );
}
