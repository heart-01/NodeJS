import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

// interceptor จะถูกเรียกใช้งานหลังจาก middleware ส่วนมากจะถูกเอาไปใช้ในการจัดการ request เข้า และ response ออก
@Injectable()
export class LoggerReqResInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log('After...')),
      tap(() => console.log(`process time ${Date.now() - now} ms`)),
      map((res) => {
        return { result: res };
      }),
    );
  }
}
