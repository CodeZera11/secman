import nodemailer from "nodemailer";
import transporter from "./transporter";
import { validatedEnv } from "./env";

interface SendEmailRequest {
  emailTo: string | string[];
  emailFrom?: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendEmail = async (sendEmailRequest: SendEmailRequest) => {
  const { emailTo, emailFrom, subject, text, html } = sendEmailRequest;

  console.log(
    "Sending email to: ",
    emailTo,
    " from ",
    validatedEnv.SENDING_EMAIL
  );

  if (!text && !html) {
    throw new Error(
      "You must provide either a text or html body for the email"
    );
  }

  const response = await transporter.sendMail({
    from: emailFrom || validatedEnv.SENDING_EMAIL,
    to: emailTo,
    subject: subject,
    text: text,
    html: html,
  });

  return { success: "Email sent successfully!", data: response };
};
