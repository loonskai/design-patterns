import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { AbstractHandler } from './Handler';

export class RouteHandler extends AbstractHandler {
  private path: string;
  private routeHandler: (req: IncomingMessage, res: ServerResponse) => void;

  constructor(path: string, routeHandler: (req: IncomingMessage, res: ServerResponse) => void) {
    super();
    this.path = path;
    this.routeHandler = routeHandler;
  }

  public async handle(req: IncomingMessage, res: ServerResponse) {
    if (req.url) {
      const { pathname } = parse(req.url);
      if (this.path === pathname) {
        this.routeHandler(req, res);
      }
    }

    return super.handle(req, res);
  }
}
