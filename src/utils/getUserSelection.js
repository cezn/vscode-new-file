const path = require("path");
const vscode = require("vscode");
const { templatesSettings } = require("./templateSettings");

exports.getUserSelection = async function getUserSelection(templateName) {
  let selection = await vscode.window.showInputBox({
    placeHolder: "Filename",
    value: templatesSettings[templateName].prompt,
  });
  if (!selection) return;
  if (!path.extname(selection)) selection = `${selection}.cs`;

  return selection;
};
