import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'interceptors/logging.interceptor';
import { TransformInterceptor } from 'interceptors/transform.interceptor';
import { ErrorInterceptor } from 'interceptors/errors.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule {}
