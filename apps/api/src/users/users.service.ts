import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CreateUserRequest } from '@repo/types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserRequest) {
    console.log({ data });
    await this.prisma.user.create({
      data: {
        email: 'test@gmail.com',
      },
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
