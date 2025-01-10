"use server";

import { AuthenticateUserRequest, AuthenticateUserSchema } from "@repo/types";

export const login = async (values: AuthenticateUserRequest) => {
  const valitedFields = AuthenticateUserSchema.safeParse(values);

  if (!valitedFields.success) {
    return { error: "Invalid Fields!" };
  }

  return { success: "Email sent!" };
};
