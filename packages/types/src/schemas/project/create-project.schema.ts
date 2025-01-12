import { z } from "zod";

export const CreateProjectSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(255),
});

export type CreateProjectRequest = z.infer<typeof CreateProjectSchema>;
