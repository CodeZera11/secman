"use server";

import { DEFAULT_LOGIN_REDIRECT } from "@/constants/page-routes";
import { AuthenticateUserRequest, AuthenticateUserSchema } from "@repo/types";
import { signIn } from "auth";
import { AuthError } from "next-auth";

export const login = async (values: AuthenticateUserRequest) => {
  const valitedFields = AuthenticateUserSchema.safeParse(values);

  if (!valitedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password } = valitedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }

  return { success: "Email sent!" };
};
