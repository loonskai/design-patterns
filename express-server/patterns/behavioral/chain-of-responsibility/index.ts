import { createServer, IncomingMessage, ServerResponse } from 'http';

interface Handler {
  setNext(handler: Handler): Handler;

  handle(req: IncomingMessage, res: ServerResponse): IncomingMessage | void;
}

abstract class AbstractHandler implements Handler {
  nextHandler: Handler;

  public setNext(handler: Handler) {
    this.nextHandler = handler;

    return handler;
  }

  public handle(req: IncomingMessage, res: ServerResponse) {
    if (this.nextHandler) {
      return this.nextHandler.handle(req, res);
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}

class DefaultHandler extends AbstractHandler { }

class CorsHandler extends AbstractHandler {
  public handle(req: IncomingMessage, res: ServerResponse) {
    console.log('check cors');

    return super.handle(req, res);
  }
}

class ValidationHandler extends AbstractHandler {
  public handle(req: IncomingMessage, res: ServerResponse) {
    console.log('validate');

    return super.handle(req, res);
  }
}

const handler = new DefaultHandler();

handler
  .setNext(new CorsHandler())
  .setNext(new ValidationHandler());

const server = createServer((req, res) => handler.handle(req, res));
server.listen(5001);
