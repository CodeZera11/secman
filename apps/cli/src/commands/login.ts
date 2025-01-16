import chalk from "chalk";
import { Command } from "commander";
import ora from "ora";
import { logger } from "../utils/logger.js";
import readLineSync from "readline-sync";

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

  logger.info(`Executing ${chalk.bold("login")} command`);
  if (!email) {
    spinner.fail("Email is required");
  }
  if (!password) {
    spinner.fail("Password is required");
  }
  spinner.start();

  const response = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  console.log({ data });

  if (response.ok) {
    spinner.succeed("Login successful");
  } else {
    spinner.fail(data.message);
  }
}
