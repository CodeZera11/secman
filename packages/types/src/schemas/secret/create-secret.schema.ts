import { z } from "zod";

export const CreateSecretSchema = z.object({
  label: z.string().min(1, { message: "Label is required" }).max(255),
  value: z.string().min(1, { message: "Value is required" }).max(255),
  projectId: z.string().min(1, { message: "Project ID is required" }).max(255),
});

export type CreateSecretRequest = z.infer<typeof CreateSecretSchema>;
