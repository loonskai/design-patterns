import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface TodoDB extends DBSchema {
  'todo-list': {
    key: number,
    value: string,
    indexes: { 'value': number };
  }
}

export class IndexedDBStorage {
  private dbName: string;
  private dbPromise: Promise<IDBPDatabase<TodoDB>>;

  constructor(dbName: string) {
    this.dbName = dbName;
    this.dbPromise = openDB<TodoDB>(this.dbName, undefined, {
      upgrade: db => {
        if (!db.objectStoreNames.contains('todo-list')) {
          const store = db.createObjectStore('todo-list', { autoIncrement: true });
          store.createIndex('value', 'price');
        }
      }
    });
  }
  
  async getAllRows(): Promise<string[]> {
    const db = await this.dbPromise;
    return await db.getAll('todo-list');
  }
  
  async createRow(value: string): Promise<void> {
    const db = await this.dbPromise;
    await db.put('todo-list', value);
  }

  deleteRow() {

  }
}
