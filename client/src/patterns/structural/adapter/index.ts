import { IndexedDBStorage } from './IndexedDBStorage';
import { MongoStorage } from './MongoStorage';

export enum StorageTypes {
  MONGO = 'MONGO',
  INDEXEDDB = 'INDEXEDDB'
}

type StorageAssignee = MongoStorage | IndexedDBStorage;

interface StorageInterface {
  getAll(): Promise<string[]>;
  add(value: string): void;
  delete(value: string): void;
}

export class StorageAdapter implements StorageInterface {
  private asignee: StorageAssignee;

  /* Takes asignee instance by default */
  constructor(asigneeType: string, storageName: string) {
    switch (asigneeType) {
      case StorageTypes.INDEXEDDB:
        this.asignee = new IndexedDBStorage(storageName);
        break;
      case StorageTypes.MONGO:
        this.asignee = new MongoStorage(storageName);
        break;
      default:
        throw new Error('Unknown storage type');
    }
  }

  async getAll(): Promise<string[]> {
    if (this.asignee instanceof IndexedDBStorage) {
      return await this.asignee.getAllRows();
    }
    return [];
  }

  async add(value: string): Promise<void> {
    if (this.asignee instanceof IndexedDBStorage) {
      this.asignee.createRow(value);
    }
  }

  delete(value: string) {

  }
}
