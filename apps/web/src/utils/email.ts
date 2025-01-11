import { sendEmail } from "@repo/lib";

export const sendVerificationEmail = async (email: string, token: string) => {
  const subject = "Email Verification";
  const html = `<a href="http://localhost:3000/auth/verify?token=${token}">Click here to verify your email</a>`;

  await sendEmail({
    emailTo: email,
    subject: subject,
    html: html,
  });
};

export const sendForgotPasswordEmail = async (email: string, token: string) => {
  const subject = "Reset Password";
  const html = `<a href="http://localhost:3000/auth/reset-password?token=${token}">Click here to reset your password</a>`;

  await sendEmail({
    emailTo: email,
    subject: subject,
    html: html,
  });
};
