import { DataSource } from '../index';

export abstract class DataSourceDecorator implements DataSource {
  protected wrapee: DataSource

  constructor(source: DataSource) {
    this.wrapee = source;
  }

  public writeData(data: any) {
    this.wrapee.writeData(data);
  }

  public readData(): any {
    return this.wrapee.readData();
  }
}
