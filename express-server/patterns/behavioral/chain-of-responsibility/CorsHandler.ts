import { IncomingMessage, ServerResponse } from 'http';
import { AbstractHandler } from './Handler';

type CorsHandlerOptions = {
  origin?: string | string[];
}

export class CorsHandler extends AbstractHandler {
  private options: CorsHandlerOptions;

  constructor(options: CorsHandlerOptions) {
    super();
    this.options = options;
  }

  public async handle(req: IncomingMessage, res: ServerResponse) {
    const origin = req?.headers?.origin || '';
    const headers: Array<{ key: string, value: any }> = [];

    if (!this.options.origin || this.options.origin === '*') {
      headers.push({
        key: 'Access-Control-Allow-Origin',
        value: '*'
      });
    } else if (typeof this.options.origin === 'string') {
      headers.push({
        key: 'Access-Control-Allow-Origin',
        value: this.options.origin
      });
      headers.push({
        key: 'Vary',
        value: 'Origin'
      });
    } else if (Array.isArray(this.options.origin)) {
      headers.push({
        key: 'Access-Control-Allow-Origin',
        value: this.options.origin.includes(origin) ? origin : false
      });
      headers.push({
        key: 'Vary',
        value: 'Origin'
      });
    }

    headers.forEach((header) => {
      res.setHeader(header.key, header.value);
    });

    return super.handle(req, res);
  }
}
