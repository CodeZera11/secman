import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { type CreateProjectRequest, CreateProjectSchema } from '@repo/types';
import { ZodValidationPipe } from 'pipes/zod-validation.pipe';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateProjectSchema))
  create(@Body() data: CreateProjectRequest) {
    return this.projectsService.create(data);
  }
}
