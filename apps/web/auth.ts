import bcrypt from "bcryptjs";
import NextAuth, { NextAuthResult } from "next-auth";
import { prisma } from "@repo/db";
import Github from "next-auth/providers/github";
import { saltAndHashPassword } from "@repo/utils";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

const nextAuth = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;
        const hash = saltAndHashPassword(credentials.password);

        let user: any = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              hashedPassword: hash,
            },
          });
        } else {
          const isMatch = bcrypt.compareSync(
            credentials.password as string,
            user.hashedPassword
          );
          if (!isMatch) {
            throw new Error("Incorrect password.");
          }
        }

        return user;
      },
    }),
  ],
});

const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
const auth: NextAuthResult["auth"] = nextAuth.auth;
const { GET, POST } = nextAuth.handlers;
const signOut = nextAuth.signOut;

export { GET, POST, auth, signIn, signOut };
