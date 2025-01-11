"use server";

import { DEFAULT_LOGIN_REDIRECT } from "@/constants/page-routes";
import { AuthenticateUserRequest, AuthenticateUserSchema } from "@repo/types";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getUserByEmail } from "./user";
import { generateVerificationToken } from "@repo/utils";
import { sendVerificationEmail } from "@/utils/email";
import bcryptjs from "bcryptjs";

export const login = async (values: AuthenticateUserRequest) => {
  const valitedFields = AuthenticateUserSchema.safeParse(values);

  if (!valitedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = valitedFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "Email does not exist!" };
    }

    const passwordMatch = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!passwordMatch) {
      return { error: "Invalid credentials!" };
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(email);
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );
      return { success: "Confirmation email sent!" };
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log({ Loginerror: error });
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        case "AccessDenied":
          return { error: "Access Denied!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }

  return { success: "Email sent!" };
};
