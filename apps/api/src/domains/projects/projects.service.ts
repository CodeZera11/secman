import { Injectable } from '@nestjs/common';
import { prisma } from '@repo/db';
import { type ProtectedEndPointBaseRequest } from '@repo/types';
import { type CreateProjectRequestDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  async create(data: CreateProjectRequestDto) {
    const project = await prisma.project.create({
      data: {
        name: data.name,
        userId: data.user_id,
      },
    });

    return project;
  }

  async findOne(id: string) {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    return project;
  }

  async findAll(baseRequest: ProtectedEndPointBaseRequest) {
    const projects = await prisma.project.findMany({
      where: {
        userId: baseRequest.user_id,
      },
    });

    return projects;
  }
}
