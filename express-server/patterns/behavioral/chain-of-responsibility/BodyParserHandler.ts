import { IncomingMessage, ServerResponse } from 'http';
import { StringDecoder } from 'string_decoder';
import { AbstractHandler } from './Handler';

declare module "http" {
  interface IncomingMessage {
    body?: string;
  }
}

export class BodyParserHandler extends AbstractHandler {
  public async handle(req: IncomingMessage, res: ServerResponse) {
    const body = await this.getRawBody(req);
    req.body = body;

    return super.handle(req, res);
  }

  private async getRawBody(req: IncomingMessage): Promise<string> {
    const decoder = new StringDecoder('utf8');
    let result = "";

    return new Promise((resolve, reject) => {
      req.on('data', chunk => {
        result += decoder.write(chunk);
      });

      req.on('end', (err: any) => {
        if (err) return reject(err);
        resolve(result);
      })
    });
  }
}
