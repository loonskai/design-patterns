import { deflateRaw } from 'zlib';
import { promisify } from 'util';

import { FileDataSourceWithDecorators } from '../typescript/index';

const asyncDeflateRaw = promisify(deflateRaw);

export function compress(target: any, propertyKey: any, descriptor: TypedPropertyDescriptor<(...params: any[]) => Promise<any>>) {
  const prevMethodValue = descriptor.value;
  descriptor.value = async function(this: FileDataSourceWithDecorators, data: any, encoding?: BufferEncoding) {
    if (this.params.compress) {
      const buffer = Buffer.from(data, 'utf-8');
      const buf = await asyncDeflateRaw(buffer);
      this.ext = '.txt.gz'

      prevMethodValue?.call(this, buf, 'binary')
    } else {
      prevMethodValue?.call(this, data, encoding);
    }
  }
}
