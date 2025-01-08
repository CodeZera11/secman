import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { type CreateUserRequest } from '@repo/types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUserRequest): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email,
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
