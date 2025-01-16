import chalk from "chalk";
import { Command } from "commander";
import ora from "ora";
import { logger } from "../utils/logger.js";
import readLineSync from "readline-sync";
import axios from "axios";
import { saveTokens } from "../utils/auth.js";

const spinner = ora({
  // text: "Loading...",
  color: "yellow",
});

export const login = new Command()
  .name("login")
  .description("Login to the system")
  .action(async () => {
    return await runLogin();
  });

export async function runLogin() {
  let email;
  while (!email) {
    const input = readLineSync.question("Enter your email: ");
    if (input) {
      email = input;
    }
  }

  let password;
  while (!password) {
    const input = readLineSync.question("Enter your password: ", {
      hideEchoBack: true,
    });
    if (input) {
      password = input;
    }
  }

  if (!email || !password) {
    console.log("Both email and password are required.");
    return;
  }

  console.log({ password });

  logger.info(`Executing ${chalk.bold("login")} command`);
  if (!email) {
    spinner.fail("Email is required");
  }
  if (!password) {
    spinner.fail("Password is required");
  }
  spinner.start();
  const response = await axios.post("http://localhost:4000/auth/login", {
    email,
    password,
  });

  const error = response.data.data.error;
  if (error) {
    spinner.fail("Login failed");
    console.log({ error });
    return;
  }

  const { token } = response.data.data;
  saveTokens({ token });
  spinner.succeed("Login successful");
}
