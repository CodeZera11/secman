import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { prisma } from '@repo/db';
import * as bcrypt from 'bcryptjs';
import { encode } from '../../utils/encode';
import { validatedEnv } from 'config/env.config';
import { NODE_ENV_ENUM } from '@repo/types';

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

      console.log({ existingUser });
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password,
      );

      if (!passwordMatch) {
        throw new HttpException('Invalid password', 400);
      }

      const token = await encode({
        salt:
          validatedEnv.NODE_ENV === NODE_ENV_ENUM.PRODUCTION
            ? '__Secure-authjs.session-token'
            : 'authjs.session-token',
        secret: validatedEnv.AUTH_SECRET,
      });

      return { token };

      // return {
      //   access_token: account.access_token,
      //   refresh_token: account.refresh_token,
      // };
    } catch (error) {
      console.log({ error });
      return { message: 'An error occurred', error: true };
    }
  }
}
