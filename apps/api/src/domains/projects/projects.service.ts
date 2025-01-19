import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { prisma } from '@repo/db';
import {
  CreateProjectRequest,
  type ProtectedEndPointBaseRequest,
} from '@repo/types';

@Injectable()
export class ProjectsService {
  async create(userId: string, data: CreateProjectRequest) {
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
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        secrets: true,
      },
    });

    return projects;
  }

  async update(
    userId: string,
    id: string,
    data: Partial<CreateProjectRequest>,
  ) {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existingUser) throw new NotFoundException('User not found!');

    const project = await prisma.project.findUnique({
      where: {
        id: id,
      },
    });
    if (!project) throw new NotFoundException('Project not found!');

    const isOwner = project.userId === userId;
    if (!isOwner)
      throw new UnauthorizedException(
        'You are not authorized to delete this project!',
      );

    console.log('updating...');
    const updatedProject = await prisma.project.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    });

    return updatedProject;
  }

  async remove(userId: string, id: string) {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existingUser) throw new NotFoundException('User not found!');

    const project = await prisma.project.findUnique({
      where: {
        id: id,
      },
    });
    if (!project) throw new NotFoundException('Project not found!');

    const isOwner = project.userId === userId;
    if (!isOwner)
      throw new UnauthorizedException(
        'You are not authorized to delete this project!',
      );

    console.log('deleting...');

    const deletedProject = await prisma.project.delete({
      where: {
        id,
      },
    });

    return deletedProject;
  }
}
