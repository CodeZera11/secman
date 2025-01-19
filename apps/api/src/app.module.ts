import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersModule } from './domains/users/users.module';
import { ProjectsModule } from './domains/projects/projects.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { ErrorInterceptor } from 'src/interceptors/errors.interceptor';
import { SecretsModule } from './domains/secrets/secrets.module';
import { AuthModule } from './domains/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    ProjectsModule,
    SecretsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
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
