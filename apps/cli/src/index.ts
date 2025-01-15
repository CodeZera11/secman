import { Command } from "commander";
import { example } from "./commands/example.js";

function main() {
  const program = new Command()
    .name("secman")
    .description("A simple CLI template")
    .version("1.0.0");

  program.addCommand(example);

  program.parse();
}

main();
