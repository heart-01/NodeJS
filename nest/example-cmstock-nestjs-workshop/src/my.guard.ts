import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /*
    const request = context.switchToHttp().getRequest();
    if (request.query.secret === '1234') {
      return true
    }
    return false;
    */
    return true
  }
}
