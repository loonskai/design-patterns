import { createCipheriv, randomBytes, createHash } from 'crypto';

import { FileDataSourceWithDecorators } from '../typescript/index';

export function encrypt(target: any, propertyKey: any, descriptor: TypedPropertyDescriptor<(...params: any[]) => Promise<any>>) {
  const prevMethodValue = descriptor.value;
  descriptor.value = async function(this: FileDataSourceWithDecorators, data: any, encoding?: BufferEncoding) {
    if (this.params.encrypt) {
      const iv = randomBytes(16);
      const salt = 'foobar';
      const hash = createHash('sha1');
      hash.update(salt);
      let key = hash.digest().slice(0, 16);
      
      const cipher = createCipheriv('aes-128-cbc', key, iv);
      
      let enc = cipher.update(data, 'utf8', 'hex');
      enc += cipher.final('hex');
      prevMethodValue?.call(this, enc, 'hex')
    } else {
      prevMethodValue?.call(this, data, encoding);
    }
  }
}
