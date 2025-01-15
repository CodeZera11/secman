import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import {
  CreateProjectSchema,
  type ProtectedEndPointBaseRequest,
  ProtectedEndPointBaseSchema,
} from '@repo/types';
import { ZodValidationPipe } from 'pipes/zod-validation.pipe';
import { ResponseMessage } from 'src/decorators/response-message.decorator';
import { type CreateProjectRequestDto } from './dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ResponseMessage('Project created successfully')
  @UsePipes(new ZodValidationPipe(CreateProjectSchema, { protected: true }))
  create(@Body() createProjectRequest: CreateProjectRequestDto) {
    return this.projectsService.create(createProjectRequest);
  }

  @Get()
  @ResponseMessage('Fetched projects successfully!')
  @UsePipes(
    new ZodValidationPipe(ProtectedEndPointBaseSchema, { protected: true }),
  )
  findAll(@Body() baseRequest: ProtectedEndPointBaseRequest) {
    return this.projectsService.findAll(baseRequest);
  }

  @Get(':id')
  @ResponseMessage('One project fetched successfully')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }
}
