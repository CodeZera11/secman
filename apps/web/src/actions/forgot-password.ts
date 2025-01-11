"use server";

import { getUserByEmail } from "./user";
import { sendForgotPasswordEmail } from "@/utils/email";
import { generateResetPasswordToken } from "@repo/utils";
import { ForgotPasswordRequest, ForgotPasswordSchema } from "@repo/types";

export const forgotPassword = async (data: ForgotPasswordRequest) => {
  const validatedFields = ForgotPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const resetPasswordToken = await generateResetPasswordToken(email);

  await sendForgotPasswordEmail(
    resetPasswordToken.email,
    resetPasswordToken.token
  );

  return { success: "Reset email sent!" };
};
