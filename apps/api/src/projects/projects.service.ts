import { Injectable } from '@nestjs/common';
import { prisma } from '@repo/db';
import { CreateProjectRequest } from '@repo/types';

@Injectable()
export class ProjectsService {
  async create(data: CreateProjectRequest) {
    const project = await prisma.project.create({
      data: {
        name: data.name,
        userId: 'cm5trigq50000h3d0rudawymu',
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

  async findAll() {
    const projects = await prisma.project.findMany({
      where: {
        userId: 'cm5trigq50000h3d0rudawymu',
      },
    });

    return projects;
  }
}
