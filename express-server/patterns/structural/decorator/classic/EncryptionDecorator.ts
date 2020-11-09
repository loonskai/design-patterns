import { DataSourceDecorator } from './index';

export class EncryptionDecorator extends DataSourceDecorator {
  public writeData(data: any) {
    console.log('encrypt');
    this.wrapee.writeData(data);
  }

  public readData(): any {
    console.log('decrypt');
    return this.wrapee.readData();
  }
}
