const fs = require("fs");
const exists = require("util").promisify(fs.exists);
const findUp = require("find-up");
const path = require("path");

/**
 *
 * @param {string} activePath Path from which to start search. If it doesn't exist on fs,
 * this function traverses part paths.
 * @returns {Promise<string | undefined>} Directory path containing .csproj file
 */
async function findCsprojDir(activePath) {
  const cwd = await findExistingDir(activePath);
  return await findUp(dir => fs.readdirSync(dir).some(f => f.endsWith(".csproj")) && dir, {
    cwd,
    type: "directory",
  });
}
exports.findCsprojDir = findCsprojDir;

async function findExistingDir(activePath) {
  // TODO: won't work on windows?
  while (activePath !== "/") {
    if (await exists(activePath)) return activePath;
    activePath = path.dirname(activePath);
  }
}
