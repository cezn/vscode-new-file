const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const util = require("util");
const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const { getBaseDir } = require("./utils/getBaseDir");
const { getNamespaceForDir } = require("./utils/getNamespaceForDir");
const { renderTemplate } = require("./utils/renderTemplate");
const { getUserSelection } = require("./utils/getUserSelection");

/**
 *
 * @param {'class' | 'interface' | 'enum'} templateName
 * @param {vscode.Uri} baseUrl
 */

async function newCommand(templateName, baseUrl) {
  const selectedPath = await getUserSelection(templateName);
  if (!selectedPath) return;

  const destinationPath = path.resolve(await getBaseDir(baseUrl), selectedPath);
  if (await exists(destinationPath)) {
    vscode.window.showWarningMessage("File already exists");
    return;
  }

  const namespace = await getNamespaceForDir(path.dirname(destinationPath));
  const [template, cursorIdx] = await renderTemplate({
    templateName,
    context: {
      name: path.parse(destinationPath).name,
      namespace,
    },
  });

  await mkdir(path.dirname(destinationPath), { recursive: true });
  await writeFile(destinationPath, template);

  const doc = await vscode.workspace.openTextDocument(destinationPath);
  const editor = await vscode.window.showTextDocument(doc);
  const pos = editor.document.positionAt(cursorIdx);
  editor.selection = new vscode.Selection(pos, pos);
}
exports.newCommand = newCommand;
