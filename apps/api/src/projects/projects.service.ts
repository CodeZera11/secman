import { Injectable } from '@nestjs/common';
import { CreateProjectRequest } from '@repo/types';

@Injectable()
export class ProjectsService {
  async create(data: CreateProjectRequest) {
    console.log({ data });
  }
}
