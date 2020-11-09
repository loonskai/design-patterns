import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

export interface DataSource {
  ext?: string
  writeData(data: any, encoding?: BufferEncoding): void;
  readData(): any
}

export class FileDataSource implements DataSource {
  private path?: string;
  public ext? = '.txt'

  constructor(fileName: string) {
    this.path = path.join(process.cwd(), 'temp', fileName);
  }

  public async writeData(data: any, encoding: BufferEncoding = 'utf-8'): Promise<void> {
    await writeFileAsync(
      `${this.path}${this.ext || '.txt'}`,
      data, 
      { encoding }
    );
  }

  public async readData(): Promise<any> {
    const data = await readFileAsync(this.path || '', { encoding: 'utf-8' });
    return data;
  }
}






