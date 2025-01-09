import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { type CreateUserRequest } from '@repo/types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserRequest) {
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
      },
    });

    return user;
  }

  async findAll() {
    const count = await this.prisma.user.count();
    const users = await this.prisma.user.findMany();
    return {
      data: users,
      count,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
