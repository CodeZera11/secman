import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateMultipleSecretsRequest,
  type CreateSecretRequest,
} from '@repo/types';
import { prisma } from '@repo/db';

@Injectable()
export class SecretsService {
  async create(projectId: string, createSecretRequest: CreateSecretRequest) {
    try {
      const existingProject = await prisma.project.findUnique({
        where: { id: projectId },
      });

      if (!existingProject) {
        throw new NotFoundException('Project not found');
      }

      const { label, value } = createSecretRequest;

      await prisma.secret.create({
        data: {
          label: label,
          value: value,
          projectId: projectId,
        },
      });

      return;
    } catch (error) {
      return error;
    }
  }

  async createBulk(projectId: string, data: CreateMultipleSecretsRequest) {
    try {
      const existingProject = await prisma.project.findUnique({
        where: { id: projectId },
        include: { secrets: true },
      });

      if (!existingProject) {
        throw new NotFoundException('Project not found');
      }

      // first delete the existing ones
      await prisma.secret.deleteMany({
        where: {
          projectId,
        },
      });

      const secretsData = data.secrets.map((item) => ({
        ...item,
        projectId: projectId,
      }));

      await prisma.secret.createMany({
        data: secretsData,
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
