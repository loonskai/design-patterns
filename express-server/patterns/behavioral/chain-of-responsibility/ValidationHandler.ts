
import { IncomingMessage, ServerResponse } from 'http';
import { AbstractHandler } from './Handler';

type ValidationSchema = {
  min?: number;
  max?: number;
}

type ValidationKey = 'min' | 'max';

type ValidationError = {
  type: string;
  condition: any;
  value: any;
}

export class ValidationHandler extends AbstractHandler {
  private validationSchema: ValidationSchema;

  constructor(validationSchema: ValidationSchema) {
    super();
    this.validationSchema = validationSchema;
  }

  public async handle(req: IncomingMessage, res: ServerResponse) {
    console.log(req.body);
    const errors = this.validate(req.body);
    
    if (errors.length > 0) {
      res.writeHead(400, {
        'Content-Type': 'application/json'
      });
      res.end(JSON.stringify(errors));
      return;
    }

    return super.handle(req, res);
  }

  private validate(body: string | undefined): ValidationError[] {
    return Object.keys(this.validationSchema).reduce((acc: ValidationError[], validationKey: ValidationKey) => {
      const condition = this.validationSchema[validationKey];
      switch (validationKey) {
        case 'min':
          return body && condition && body.length < condition ? [...acc, { type: 'min', condition, value: body.length }] : acc;
        case 'max':
          return body && condition && body.length > condition ? [...acc, { type: 'max', condition, value: body.length }] : acc;
        default:
          return acc;
      }
    }, [])
  }
}
