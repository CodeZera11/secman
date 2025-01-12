import { z } from "zod";
import { zodSchemaParser } from "@repo/utils";

export const envSchema = z.object({
  NEXT_PUBLIC_PORT: z.string(),
  NEXT_PUBLIC_BASE_API_URL: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

export const validatedEnv = zodSchemaParser(envSchema, {
  NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_BASE_API_URL,
  NEXT_PUBLIC_BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
});
