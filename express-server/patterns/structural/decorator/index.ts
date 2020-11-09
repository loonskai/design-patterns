export interface DataSource {
  writeData(data: any): void;
  readData(): any
}

export class FileDataSource implements DataSource {
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  public writeData(data: any) {

  }

  public readData(): any {
    
  }
}






