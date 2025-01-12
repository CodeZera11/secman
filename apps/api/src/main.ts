import * as dotenv from 'dotenv';
import { AppModule } from 'src/app.module';
import { NestFactory } from '@nestjs/core';
import { validatedEnv } from 'config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  dotenv.config();
  const port = validatedEnv.PORT;
  await app.listen(port);
  console.log(`Application is running on: ${port}`);
}
bootstrap();
