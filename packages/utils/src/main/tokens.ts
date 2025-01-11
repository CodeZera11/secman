import { prisma } from "@repo/db";
import { v4 as uuidV4 } from "uuid";

const TOKEN_EXPIRATION_TIME_IN_MS = 60 * 60 * 1000;

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    console.log("finding verification token");
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + TOKEN_EXPIRATION_TIME_IN_MS);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
      where: {
        email,
      },
    });

    return resetPasswordToken;
  } catch (error) {
    return null;
  }
};

export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
      where: {
        token,
      },
    });

    return resetPasswordToken;
  } catch (error) {
    return null;
  }
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + TOKEN_EXPIRATION_TIME_IN_MS);

  const existingToken = await getResetPasswordTokenByEmail(email);
  if (existingToken) {
    await prisma.resetPasswordToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const resetPasswordToken = await prisma.resetPasswordToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return resetPasswordToken;
};
