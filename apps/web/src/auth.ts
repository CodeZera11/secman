import NextAuth, { NextAuthResult } from "next-auth";
import { prisma } from "@repo/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { getUserById } from "@/actions/user";
import { PageRoutes } from "./constants/page-routes";

const nextAuth = NextAuth({
  pages: {
    signIn: PageRoutes.AUTH.LOGIN,
    error: PageRoutes.AUTH.ERROR,
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      if (!user?.id) return false;

      const existingUser = await getUserById(user.id);
      
      // Prevent signin without email verification
      if (!existingUser?.emailVerified) return false;

      // TODO: Add 2FA check

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  // providers: [
  //   Github({
  //     clientId: process.env.AUTH_GITHUB_ID,
  //     clientSecret: process.env.AUTH_GITHUB_SECRET,
  //   }),
  //   Credentials({
  //     name: "Credentials",
  //     credentials: {
  //       email: {
  //         label: "Email",
  //         type: "email",
  //         placeholder: "email@example.com",
  //       },
  //       password: { label: "Password", type: "password" },
  //     },
  //     authorize: async (credentials) => {
  //       if (!credentials || !credentials.email || !credentials.password) {
  //         return null;
  //       }

  //       const email = credentials.email as string;
  //       const hash = saltAndHashPassword(credentials.password);

  //       let user: any = await prisma.user.findUnique({
  //         where: {
  //           email,
  //         },
  //       });

  //       if (!user) {
  //         user = await prisma.user.create({
  //           data: {
  //             email,
  //             password: hash,
  //           },
  //         });
  //       } else {
  //         const isMatch = bcrypt.compareSync(
  //           credentials.password as string,
  //           user.hashedPassword
  //         );
  //         if (!isMatch) {
  //           throw new Error("Incorrect password.");
  //         }
  //       }

  //       return user;
  //     },
  //   }),
  // ],
});

const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
const auth: NextAuthResult["auth"] = nextAuth.auth;
const { GET, POST } = nextAuth.handlers;
const signOut = nextAuth.signOut;

export { GET, POST, auth, signIn, signOut };
