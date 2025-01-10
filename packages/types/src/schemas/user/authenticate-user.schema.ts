import { z } from "zod";

export const AuthenticateUserSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }).max(255),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(255),
});

export type AuthenticateUserRequest = z.infer<typeof AuthenticateUserSchema>;
