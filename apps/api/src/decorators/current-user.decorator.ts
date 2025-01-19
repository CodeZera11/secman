import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { ProtectedEndPointBaseRequest } from '@repo/types';

export const CurrentUser = createParamDecorator(
  (
    key: keyof ProtectedEndPointBaseRequest | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) throw new NotFoundException('User not found');

    if (key && !(key in user)) {
      throw new NotFoundException('User property not found in request');
    }
    return key ? user?.[key] : user;
  },
);
