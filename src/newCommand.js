const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const util = require("util");
const exists = util.promisify(fs.exists);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const { findCsprojDir } = require("./utils/findCsprojDir");
const { getActivePath } = require("./utils/getActivePath");
const { calculateNamespace } = require("./utils/calculateNamespace");
const { renderTemplate } = require("./utils/renderTemplate");
const { getUserSelection } = require("./utils/getUserSelection");

/**
 *
 * @param {'class' | 'interface' | 'enum'} templateName
 * @param {vscode.Uri} fileUrl
 */

async function newCommand(templateName, fileUrl) {
  const selectedPath = await getUserSelection(templateName);
  if (!selectedPath) return;
  const activePath = await getActivePath(fileUrl);
  const destinationPath = path.resolve(activePath, selectedPath);
  const csprojDirPath = await findCsprojDir(activePath);
  const namespace = calculateNamespace(destinationPath, csprojDirPath);

  if (await exists(destinationPath)) {
    vscode.window.showWarningMessage("File already exists");
    return;
  }

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
