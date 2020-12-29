import { createServer } from 'http';
import { DefaultHandler } from './Handler';
import { CorsHandler } from './CorsHandler';
import { BodyParserHandler } from './BodyParserHandler';
import { ValidationHandler } from './ValidationHandler';
import { RouteHandler } from './RouteHandler';

const handler = new DefaultHandler();

handler
  .setNext(new CorsHandler({ origin: '*' }))
  .setNext(new BodyParserHandler())
  .setNext(new ValidationHandler({ min: 2, max: 5 }))
  .setNext(new RouteHandler('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`The request body is valid: ${req.body}`);
  }));

const server = createServer((req, res) => handler.handle(req, res));
server.listen(5001);
