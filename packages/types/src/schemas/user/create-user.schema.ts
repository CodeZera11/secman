import { z } from "zod";

export const CreateCredentialsUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().min(1).max(255),
  password: z.string().min(8).max(255),
});

export type CreateCredentialsUserRequest = z.infer<
  typeof CreateCredentialsUserSchema
>;
