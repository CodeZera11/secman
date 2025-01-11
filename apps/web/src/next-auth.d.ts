import { UserRole } from "@repo/db";
import { type DefaultSession } from "next-auth";
import { type JWT } from "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
  }
}
