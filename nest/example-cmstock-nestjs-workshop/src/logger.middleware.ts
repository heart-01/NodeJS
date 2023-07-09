import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // console.log(req)
    next();

    /*
    const { keyword } = req.query
    if (keyword) {
      req.timestamp = "xxx"
      next()
    } else {
      throw new NotFoundException("keyword not found")
    }
    */
  }
}
