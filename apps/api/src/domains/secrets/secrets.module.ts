import { Module } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { SecretsController } from './secrets.controller';

@Module({
  imports: [],
  controllers: [SecretsController],
  providers: [SecretsService],
})
export class SecretsModule {}
