import * as fs from "fs";
import * as path from "path";
import os from "os";

const tokenFilePath = path.resolve(os.homedir(), "tokens.json");

function getTokens() {
  if (fs.existsSync(tokenFilePath)) {
    const tokens = JSON.parse(fs.readFileSync(tokenFilePath, "utf8"));
    return tokens;
  }
  return null;
}

function saveTokens(tokens: any) {
  fs.writeFileSync(tokenFilePath, JSON.stringify(tokens, null, 2));
}

// module.exports = { getTokens, saveTokens };
export { getTokens, saveTokens };
