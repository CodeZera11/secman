import { z } from "zod";

export const CreateSecretSchema = z.object({
  label: z.string().min(1, { message: "Label is required" }).max(255),
  value: z.string().min(1, { message: "Value is required" }).max(255),
});

export const CreateMultipleSecretsSchema = z.object({
  secrets: z.array(CreateSecretSchema),
});

export type CreateSecretRequest = z.infer<typeof CreateSecretSchema>;
export type CreateMultipleSecretsRequest = z.infer<
  typeof CreateMultipleSecretsSchema
>;
