"use server";

import { prisma } from "@repo/db";
import {
  CreateCredentialsUserRequest,
  CreateCredentialsUserSchema,
} from "@repo/types";
import * as bcrypt from "bcryptjs";
import { getUserByEmail } from "./user";

export const register = async (values: CreateCredentialsUserRequest) => {
  const valitedFields = CreateCredentialsUserSchema.safeParse(values);

  if (!valitedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { name, email, password } = valitedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }
  console.log("creating suer");

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  //  TODO: SEND VERIFICATION EMAIL

  return { success: "User created successfully!" };
};
