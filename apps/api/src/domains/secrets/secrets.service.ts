import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { type CreateSecretRequest } from '@repo/types';
import { prisma } from '@repo/db';

@Injectable()
export class SecretsService {
  async create(createSecretRequest: CreateSecretRequest) {
    try {
      const existingProject = await prisma.project.findUnique({
        where: { id: createSecretRequest.projectId },
      });

      if (!existingProject) {
        throw new NotFoundException('Project not found');
      }

      await prisma.secret.create({
        data: {
          label: createSecretRequest.label,
          value: createSecretRequest.value,
          projectId: createSecretRequest.projectId,
        },
      });

      return;
    } catch (error) {
      return error;
    }
  }

  async findAll(userId: string, projectId: string) {
    try {
      const existingProject = await prisma.project.findUnique({
        where: { id: projectId },
      });

      if (!existingProject) throw new NotFoundException('Project not found');

      const ifUserOwnsProject = existingProject.userId === userId;

      if (!ifUserOwnsProject) throw new UnauthorizedException();

      return await prisma.secret.findMany({
        where: {
          projectId,
        },
      });
    } catch (error) {
      return error;
    }
  }
}
