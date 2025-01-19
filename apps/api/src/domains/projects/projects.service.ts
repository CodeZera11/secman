import { Injectable } from '@nestjs/common';
import { prisma } from '@repo/db';
import {
  CreateProjectRequest,
  type ProtectedEndPointBaseRequest,
} from '@repo/types';

@Injectable()
export class ProjectsService {
  async create(userId: string, data: CreateProjectRequest) {
    console.log('Creating project', data);
    const project = await prisma.project.create({
      data: {
        name: data.name,
        userId: userId,
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

  async findAll(user: ProtectedEndPointBaseRequest) {
    const projects = await prisma.project.findMany({
      where: {
        userId: user.user_id,
      },
      include: {
        secrets: true,
      },
    });

    return projects;
  }
}
