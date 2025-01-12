import nodemailer from "nodemailer";
import { validatedEnv } from "./env.config";

const transporter = nodemailer.createTransport({
  host: validatedEnv.SMTP_HOST,
  port: validatedEnv.SMTP_PORT,
  secure: false,
  auth: {
    user: validatedEnv.SMTP_USER,
    pass: validatedEnv.SMTP_PASS,
  },
});

export default transporter;
