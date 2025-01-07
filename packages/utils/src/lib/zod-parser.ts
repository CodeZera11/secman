import { ZodSchema } from "zod";

export function zodSchemaParser<T>(
  schema: ZodSchema<T>,
  env: Record<string, string | undefined>
): T {
  const parsed = schema.safeParse(env);

  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.errors);
    throw new Error("Environment variable validation failed");
  }

  return parsed.data;
}
