import { deflateRaw } from 'zlib';
import { promisify } from 'util';
import { DataSourceDecorator } from './index';

const asyncDeflateRaw = promisify(deflateRaw);

export class CompressionDecorator extends DataSourceDecorator {
  public async writeData(data: any) {
    const buffer = Buffer.from(data, 'utf-8');
    const buf = await asyncDeflateRaw(buffer);

    this.wrapee.ext = '.txt.gz'
    this.wrapee.writeData(buf, 'binary'); 
  }

  public async readData() {
    console.log('decompress');
    return this.wrapee.readData();
  }
}
