import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

interface CustomRequest extends Request {
  timestamp: number;
}

@Injectable()
export class CreateTimestampMiddleware implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: Function) {
    req.timestamp = Date.now();

    // (req as any).timestamp = Date.now() as number; // Type Assertion การแปลงชนิดข้อมูลชั่วคราวเป็นวิธีที่ไม่ปลอดภัย ใช้เฉพาะ middleware ส่วนนี้เท่านั้น

    next();
  }
}
