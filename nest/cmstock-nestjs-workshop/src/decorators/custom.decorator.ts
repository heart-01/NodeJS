import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUsername = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.username;
  },
);
