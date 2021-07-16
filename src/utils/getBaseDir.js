const vscode = require("vscode");
const path = require("path");
const { promisify } = require("util");
const fs = require("fs");
const stat = promisify(fs.stat);

async function getBaseDir(folder) {
  let newUri = folder;

  if (!folder) {
    // triggered by a keybinding - folder is undefined
    const prev = await vscode.env.clipboard.readText();
    await vscode.commands.executeCommand("copyFilePath");
    folder = await vscode.env.clipboard.readText(); // returns a string
    await vscode.env.clipboard.writeText(prev);

    newUri = await vscode.Uri.file(folder);
  }

  return (await stat(newUri.fsPath)).isDirectory() ? newUri.fsPath : path.dirname(newUri.fsPath);
}
exports.getBaseDir = getBaseDir;
