import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import {
  type CreateProjectRequest,
  CreateProjectSchema,
  type ProtectedEndPointBaseRequest,
} from '@repo/types';
import { ResponseMessage } from 'src/decorators/response-message.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ResponseMessage('Project created successfully')
  create(
    @Body(new ZodValidationPipe(CreateProjectSchema))
    createProjectRequest: CreateProjectRequest,
    @CurrentUser('user_id') userId: string,
  ) {
    console.log({ userId });
    return this.projectsService.create(userId, createProjectRequest);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ResponseMessage('Fetched projects successfully!')
  findAll(@CurrentUser() user: ProtectedEndPointBaseRequest) {
    return this.projectsService.findAll(user);
  }

  @Get(':id')
  @ResponseMessage('One project fetched successfully')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @CurrentUser('user_id') userId: string,
    @Body(new ZodValidationPipe(CreateProjectSchema))
    data: Partial<CreateProjectRequest>,
  ) {
    return this.projectsService.update(userId, id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string, @CurrentUser('user_id') userId: string) {
    return this.projectsService.remove(userId, id);
  }
}
