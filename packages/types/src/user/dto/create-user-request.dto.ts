import { z } from "zod";

export const CreateUserRequestDtoSchema = z
  .object({
    email: z.string().email().min(1).max(255),
    name: z.string().optional()
  })
  .required();

export type CreateUserRequest = z.infer<typeof CreateUserRequestDtoSchema>;
