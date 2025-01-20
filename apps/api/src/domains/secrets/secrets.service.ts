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
import { decryptSecret, encryptSecret } from 'src/utils/encryption';

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

  async createBulk(
    userId: string,
    projectId: string,
    data: CreateMultipleSecretsRequest,
  ) {
    try {
      const existingProject = await prisma.project.findUnique({
        where: { id: projectId },
        include: { secrets: true },
      });

      if (!existingProject) {
        throw new NotFoundException('Project not found');
      }

      await prisma.secret.deleteMany({
        where: {
          projectId,
        },
      });

      const secretsData = data.secrets.map((item) => ({
        ...item,
        value: encryptSecret({
          userId: userId,
          secretValue: item.value,
        }),
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

      const secrets = await prisma.secret.findMany({
        where: {
          projectId,
        },
      });

      const decryptedSecrets = secrets.map((secret) => ({
        ...secret,
        value: decryptSecret({
          userId: userId,
          encryptedValue: secret.value,
        }),
      }));

      return decryptedSecrets;
    } catch (error) {
      return error;
    }
  }
}
