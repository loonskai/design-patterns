import { IncomingMessage, ServerResponse } from 'http';

interface Handler {
  setNext(handler: Handler): Handler;

  handle(req: IncomingMessage, res: ServerResponse): Promise<IncomingMessage | void>;
}

export abstract class AbstractHandler implements Handler {
  private nextHandler: Handler;

  public setNext(handler: Handler) {
    this.nextHandler = handler;

    return handler;
  }

  public async handle(req: IncomingMessage, res: ServerResponse) {
    if (this.nextHandler) {
      return this.nextHandler.handle(req, res);
    }

    if (!res.headersSent) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  }
}

export class DefaultHandler extends AbstractHandler {}
