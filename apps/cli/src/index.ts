import { Command } from "commander";
import { example } from "./commands/example.js";
import { login } from "./commands/login.js";

function main() {
  const program = new Command()
    .name("secman")
    .description("A simple CLI template")
    .version("1.0.0");

  program.addCommand(example);
  program.addCommand(login);

  program.parse();
}

main();
