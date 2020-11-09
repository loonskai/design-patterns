import { DataSourceDecorator } from './index';

export class CompressionDecorator extends DataSourceDecorator {
  public writeData(data: any) {
    console.log('compress');
    this.wrapee.writeData(data);
  }

  public readData() {
    console.log('decompress');
    return this.wrapee.readData();
  }
}
