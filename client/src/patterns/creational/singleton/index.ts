export class DatabaseSingleton {
  private data: any;
  public symbol: symbol;

  private static instance: DatabaseSingleton;

  private constructor() {
    this.symbol = Symbol();
  }

  public static getInstance(): DatabaseSingleton {
    if (!DatabaseSingleton.instance) {
      DatabaseSingleton.instance = new DatabaseSingleton();
    }

    return DatabaseSingleton.instance;
  }

  public setData(dataStr: string): void {
    try {
      DatabaseSingleton.instance.data = JSON.parse(dataStr);
    } catch (error) {
      DatabaseSingleton.instance.data = {};
    }
  }

  public getData(): any {
    return DatabaseSingleton.instance.data;
  }
}
