import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }).max(255),
});

export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>;
