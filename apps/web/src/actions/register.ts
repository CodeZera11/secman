"use server";

import { prisma } from "@repo/db";
import {
  CreateCredentialsUserRequest,
  CreateCredentialsUserSchema,
} from "@repo/types";
import * as bcrypt from "bcryptjs";
import { getUserByEmail } from "./user";
import { generateVerificationToken } from "@repo/utils";
import { sendEmail } from "@repo/lib";
import { sendVerificationEmail } from "@/utils/email";

export const register = async (values: CreateCredentialsUserRequest) => {
  const valitedFields = CreateCredentialsUserSchema.safeParse(values);

  if (!valitedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { name, email, password } = valitedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  console.log({ existingUser });

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
