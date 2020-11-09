import { createCipheriv, randomBytes, createHash } from 'crypto';
import { DataSourceDecorator } from './index';

export class EncryptionDecorator extends DataSourceDecorator {
  public async writeData(data: any): Promise<void> {
    const iv = randomBytes(16);
    const salt = 'foobar';
    const hash = createHash('sha1');
    hash.update(salt);
    let key = hash.digest().slice(0, 16);
    
    const cipher = createCipheriv('aes-128-cbc', key, iv);
    
    let enc = cipher.update(data, 'utf8', 'hex');
    enc += cipher.final('hex');

    this.wrapee.writeData(enc, 'hex');
  }

  public async readData(): Promise<any> {
    /* TODO: Implement decrypt method */
    return this.wrapee.readData();
  }
}
