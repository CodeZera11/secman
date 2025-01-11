import z from "zod";
import { zodSchemaParser } from "@repo/utils";

const envSchema = z.object({
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  SENDING_EMAIL: z.string(),
});

export const validatedEnv = zodSchemaParser(envSchema, {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SENDING_EMAIL: process.env.SENDING_EMAIL,
});
