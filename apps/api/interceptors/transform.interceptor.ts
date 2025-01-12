import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE_KEY } from 'decorators/response-message.decorator';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  data: T;
  message: string;
  statusCode: number;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        message:
          this.reflector.get<string>(
            RESPONSE_MESSAGE_KEY,
            context.getHandler(),
          ) || '',
        data,
      })),
    );
  }
}
