import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { type CreateSecretRequest } from '@repo/types';
import { ResponseMessage } from 'src/decorators/response-message.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('secrets')
export class SecretsController {
  constructor(private readonly secretsService: SecretsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ResponseMessage('Secret created successfully')
  create(@Body() createSecretRequest: CreateSecretRequest) {
    return this.secretsService.create(createSecretRequest);
  }

  @Get(':projectId')
  @UseGuards(AuthGuard)
  findAll(
    @Param('projectId') projectId: string,
    @CurrentUser('user_id') userId: string,
  ) {
    return this.secretsService.findAll(userId, projectId);
  }
}
