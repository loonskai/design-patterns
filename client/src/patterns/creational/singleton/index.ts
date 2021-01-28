export class StorageSingleton {
  private data: any;
  public symbol: symbol;

  private static instance: StorageSingleton;

  private constructor() {
    this.symbol = Symbol();
  }

  public static getInstance(): StorageSingleton {
    if (!StorageSingleton.instance) {
      StorageSingleton.instance = new StorageSingleton();
    }

    return StorageSingleton.instance;
  }

  public setData(dataStr: string): void {
    try {
      StorageSingleton.instance.data = JSON.parse(dataStr);
    } catch (error) {
      StorageSingleton.instance.data = {};
    }
  }

  public getData(): any {
    return StorageSingleton.instance.data;
  }
}

/* const storage = new StorageSingleton() - this will NOT work, constructor is private */
/* const storage = StorageSingleton.getInstance(); */
