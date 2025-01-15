import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { decryptToken } from '@repo/utils';
import { validatedEnv } from 'config/env.config';
import { NODE_ENV_ENUM } from '@repo/types';
import { UserRole } from '@repo/db';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return validateRequest(request);
  }
}

export async function validateRequest(request: any): Promise<boolean> {
  const token = request.headers['authorization'];
  const tokenValue = token?.split('Bearer ')[1];

  if (!token) return false;

  const payload = await decryptToken(
    tokenValue,
    validatedEnv.NODE_ENV === NODE_ENV_ENUM.DEVELOPMENT,
  );

  if (!payload) return false;

  const role = payload.role as UserRole;

  if (role !== UserRole.ADMIN) return false;

  return true;
}
