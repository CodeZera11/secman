import { Injectable } from '@nestjs/common';
import { type CreateUserRequest } from '@repo/types';
import { prisma } from '@repo/db';

@Injectable()
export class UsersService {
  async create(data: CreateUserRequest) {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
      },
    });

    return user;
  }

  async findAll() {
    const count = await prisma.user.count();
    const users = await prisma.user.findMany();
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
