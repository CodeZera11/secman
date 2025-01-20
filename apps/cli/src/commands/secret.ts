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

export const secrets = new Command()
  .name("list-secrets")
  .requiredOption("-p, --project <string>", "Project ID")
  .description("List secrets command")
  .action(async ({ project }) => {
    await listSecrets({ projectId: project });
  });

export async function listSecrets({ projectId }: { projectId: string }) {
  logger.info(
    `Fetching ${chalk.bold(`${projectId + " secrets"}`)} from the server...`
  );
  spinner.start();
  const token = await getTokens();
  const response = await axios.get(
    `http://localhost:4000/secrets/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    }
  );
  if (response.data.data.error) {
    spinner.fail(response.data.data.error);
    return;
  }
  const secrets = response.data.data;
  spinner.succeed("Secrets:");
  console.log(secrets);
}
