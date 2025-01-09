import { z } from 'zod';
import { zodSchemaParser } from '@repo/utils';
import { NODE_ENV_ENUM } from '@repo/types';

const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.nativeEnum(NODE_ENV_ENUM),
  DATABASE_URL: z.string(),
});

export const validatedEnv = zodSchemaParser(envSchema, {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
});
