const vscode = require("vscode");
const { newCommand } = require("./newCommand");

function showError(err) {
  vscode.window.showErrorMessage(err.message);
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("cezn.csharp-new-file.newClass", url => newCommand("class", url).catch(showError)),
    vscode.commands.registerCommand("cezn.csharp-new-file.newInterface", url =>
      newCommand("interface", url).catch(showError),
    ),
    vscode.commands.registerCommand("cezn.csharp-new-file.newEnum", url => newCommand("enum", url).catch(showError)),
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
