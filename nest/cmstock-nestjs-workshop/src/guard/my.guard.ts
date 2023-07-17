/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

// Guard จะทำหน้าที่เดียว คือ return true false ว่าไปต่อได้หรือไม่ได้ใช้ในการปกป้อง route api
// Guard จะถูกเรียกหลัง middleware แต่ก่อน interceptor

@Injectable()
export class MyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // if (request.query.secret === '1234') return true;
    return true;
  }
}
