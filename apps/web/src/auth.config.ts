import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";
import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthenticateUserSchema } from "@repo/types";
import { getUserByEmail } from "@/actions/user";
import * as bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import { validatedEnv } from "./lib/env.client";

const authConfig: { providers: Provider[] } = {
  providers: [
    Google({
      clientId: validatedEnv.GOOGLE_CLIENT_ID,
      clientSecret: validatedEnv.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: validatedEnv.GITHUB_CLIENT_ID,
      clientSecret: validatedEnv.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = AuthenticateUserSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);

        if (!user || !user.password) return null;

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

export default authConfig;
