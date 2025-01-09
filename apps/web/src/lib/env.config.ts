import { z } from "zod";
import { zodSchemaParser } from "@repo/utils";
export const envSchema = z.object({
  NEXT_PUBLIC_PORT: z.string(),
  NEXT_PUBLIC_BASE_API_URL: z.string(),
});

export const validatedEnv = zodSchemaParser(envSchema, {
  NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_BASE_API_URL,
  NEXT_PUBLIC_BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
});
