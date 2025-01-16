import { z } from 'zod';
import { zodSchemaParser } from '@repo/utils';
import { NODE_ENV_ENUM } from '@repo/types';

const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.nativeEnum(NODE_ENV_ENUM),
  AUTH_SECRET: z.string(),
});

export const validatedEnv = zodSchemaParser(envSchema, {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  AUTH_SECRET: process.env.AUTH_SECRET,
});
