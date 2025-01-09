import { NestFactory } from '@nestjs/core';
import { validatedEnv } from 'config/env-config';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = validatedEnv.PORT;
  await app.listen(port);
  console.log(`Application is running on: ${port}`);
}
bootstrap();
