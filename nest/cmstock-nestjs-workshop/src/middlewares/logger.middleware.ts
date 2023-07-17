import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

// middleware จะเหมือน custom pipe แต่จะถูกเรียกก่อน custom pipe
// ใช้ middleware แบบ class
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('logger url: ', req.url);
    next();
  }
}
