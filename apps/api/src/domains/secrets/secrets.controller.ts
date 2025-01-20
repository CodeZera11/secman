import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  CreateMultipleSecretsSchema,
  type CreateMultipleSecretsRequest,
  type CreateSecretRequest,
} from '@repo/types';
import { ResponseMessage } from 'src/decorators/response-message.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

@Controller('secrets')
export class SecretsController {
  constructor(private readonly secretsService: SecretsService) {}

  @Post(':projectId')
  @UseGuards(AuthGuard)
  @ResponseMessage('Secret created successfully')
  create(
    @Param('projectId') projectId: string,
    @Body() createSecretRequest: CreateSecretRequest,
  ) {
    return this.secretsService.create(projectId, createSecretRequest);
  }

  @Post(':projectId/bulk')
  @UseGuards(AuthGuard)
  @ResponseMessage('Secret created successfully')
  createBulk(
    @Param('projectId') projectId: string,
    @CurrentUser('user_id') userId: string,
    @Body(new ZodValidationPipe(CreateMultipleSecretsSchema))
    data: CreateMultipleSecretsRequest,
  ) {
    return this.secretsService.createBulk(userId, projectId, data);
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
