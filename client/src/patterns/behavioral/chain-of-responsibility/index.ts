interface Handler {
  setNext(handler: Handler): Handler
  handle(request: string): string 
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;

    return handler;
  }

  handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return request;
  }
}

class MonkeyHandler extends AbstractHandler {
  handle(request: string): string {
    if (request === 'Banana') {
      return `Monkey: I'll eat the ${request}`;
    }

    return super.handle(request);
  }
}
