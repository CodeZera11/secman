import { Prisma } from "@repo/db";

export interface ServerResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export type ActionResponse<T> = Promise<ServerResponse<T>>;

export type Project = Prisma.ProjectGetPayload<{
  include: { secrets: true };
}>;
