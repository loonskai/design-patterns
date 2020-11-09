import { FileDataSource } from '../classic/FileDataSource';
import { encrypt } from './encryptDecorator';
import { compress } from './compressDecorator';

type Params = {
  encrypt?: boolean
  compress?: boolean
}

export class FileDataSourceWithDecorators extends FileDataSource {
  protected params: Params;

  constructor(fileName: string, params: Params) {
    super(fileName);
    this.params = params;
  }

  @encrypt
  @compress
  async write(data: any, encoding?: BufferEncoding): Promise<void> {
    await this.writeData(data, encoding);
  }
}
