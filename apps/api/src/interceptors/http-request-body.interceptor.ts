import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { NODE_ENV_ENUM } from '@repo/types';
import { decryptToken } from '@repo/utils';
import { validatedEnv } from 'config/env.config';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestBodyInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (token) {
      const tokenValue = token?.split('Bearer ')[1];
      const payload = await decryptToken(
        tokenValue,
        validatedEnv.NODE_ENV === NODE_ENV_ENUM.DEVELOPMENT,
      );
      if (payload) {
        request.user = {
          user_id: payload.sub,
          user_name: payload.name,
        };
        request.body['user_id'] = payload.sub;
        request.body['user_name'] = payload.name;
      }
    }

    return next.handle();
  }
}
