import React, { useEffect, useState } from 'react';
import { StorageTypes, StorageAdapter } from '../patterns/structural/adapter';

export default function AdapterPage(): JSX.Element {
  const [newTodoItem, setNewTodoItem] = useState<string>('');
  const [todos, setTodos] = useState<string[]>([]);
  const [storageType, setStorageType] = useState<string>(StorageTypes.MONGO);
  const [storage, setStorage] = useState<StorageAdapter>();

  const changeStorage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStorageType(e.target.value);
  };
  
  const submitTodo = async () => {
    await storage?.add(newTodoItem);
  };
  
  useEffect(() => {
    setStorage(new StorageAdapter(storageType));
  }, [storageType]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await storage?.getAll();
      setTodos(data || []);
    };
    fetchData();
  }, [storage]);

  return (
    <div>
      <h1>Adapter</h1>
      <div>
        <label htmlFor={StorageTypes.MONGO}>MongoDB</label>
        <input 
          type="radio"
          id={StorageTypes.MONGO}
          value={StorageTypes.MONGO}
          onChange={changeStorage}
          checked={storageType === StorageTypes.MONGO}
        />
        <label htmlFor={StorageTypes.INDEXEDDB}>IndexedDB</label>
        <input 
          type="radio"
          id={StorageTypes.INDEXEDDB}
          value={StorageTypes.INDEXEDDB}
          onChange={changeStorage}
          checked={storageType === StorageTypes.INDEXEDDB}
        />
      </div>
      <div>
        <label htmlFor="todo-item">Add new TODO</label>
        <input 
          type="text"
          id="todo-item" 
          value={newTodoItem} 
          onChange={e => setNewTodoItem(e.target.value)}
        />
        <button onClick={submitTodo}>Submit</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
