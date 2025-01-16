import chalk from "chalk";
import { Command } from "commander";
import ora from "ora";
import { logger } from "../utils/logger.js";
import axios from "axios";
import { getTokens } from "../utils/auth.js";

const spinner = ora({
  // text: "Loading...",
  color: "yellow",
});

export const projects = new Command()
  .name("list-projects")
  .description("Projects command")
  .action(async () => {
    await listProjects();
  });

export async function listProjects() {
  logger.info(`Fetching ${chalk.bold("projects")} from the server...`);
  spinner.start();

  const token = await getTokens();

  const response = await axios.get("http://localhost:4000/projects", {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

  if (response.data.data.error) {
    spinner.fail(response.data.data.error);
    return;
  }

  const projects = response.data.data;
  spinner.succeed("Projects:");
  projects.forEach((project: any, i: number) => {
    console.log(`${i + 1}. ${project.name}`);
  });

  // spinner.succeed(`Hello, ${name}`);
}
