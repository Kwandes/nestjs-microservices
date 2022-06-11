import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('GATEWAY');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl } = request;

    this.logger.verbose(`${method} ${originalUrl}`);

    next();
  }
}
