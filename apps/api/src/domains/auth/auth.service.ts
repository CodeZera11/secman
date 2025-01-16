import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { prisma } from '@repo/db';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  async login(email: string, password: string) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!existingUser) {
        throw new NotFoundException('User not found');
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      if (existingUser.password !== hashedPassword) {
        throw new HttpException('Invalid password', 400);
      }

      return existingUser;
    } catch (error) {
      console.log({ error });
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
