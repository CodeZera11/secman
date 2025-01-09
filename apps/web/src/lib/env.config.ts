import { z } from "zod";
import { zodSchemaParser } from "@repo/utils";
export const envSchema = z.object({
  PORT: z.string(),
  NEXT_PUBLIC_BASE_API_URL: z.string().url(),
});

export const validatedEnv = zodSchemaParser(envSchema, {
  PORT: process.env.PORT,
  NEXT_PUBLIC_BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
});
