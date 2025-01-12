import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { type CreateProjectRequest, CreateProjectSchema } from '@repo/types';
import { ZodValidationPipe } from 'pipes/zod-validation.pipe';
import { ResponseMessage } from 'decorators/response-message.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ResponseMessage('Project created successfully')
  @UsePipes(new ZodValidationPipe(CreateProjectSchema))
  create(@Body() data: CreateProjectRequest) {
    return this.projectsService.create(data);
  }

  @Get()
  @ResponseMessage('Fetched projects successfully!')
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ResponseMessage('One project fetched successfully')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
}
