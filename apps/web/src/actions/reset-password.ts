"use server";

import { getUserByEmail } from "./user";
import { getResetPasswordTokenByToken } from "@repo/utils";
import { ResetPasswordRequest, ResetPasswordSchema } from "@repo/types";
import { prisma } from "@repo/db";
import * as bcryptjs from "bcryptjs";

export const resetPassword = async (data: ResetPasswordRequest) => {
  const validatedFields = ResetPasswordSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { password, token } = validatedFields.data;

  const existingToken = await getResetPasswordTokenByToken(token);
  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.resetPasswordToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password updated successfully!" };
};
