import { z } from "zod";

export const ProtectedEndPointBaseSchema = z.object({
  user_id: z.string(),
  user_name: z.string(),
});

export type ProtectedEndPointBaseRequest = z.infer<
  typeof ProtectedEndPointBaseSchema
>;
