const fs = require("fs");
const exists = require("util").promisify(fs.exists);
const findUp = require("find-up");
const path = require("path");

/**
 *
 * @param {string} activePath
 * @returns {Promise<string | undefined>} Directory path containng .csproj file
 */
async function findCsprojDir(activePath) {
  const cwd = await findExistingDir(activePath);
  return await findUp(dir => fs.readdirSync(dir).some(f => f.endsWith(".csproj")) && dir, {
    cwd,
    type: "directory",
  });
}
exports.findCsprojDir = findCsprojDir;

async function findExistingDir(actisvePath) {
  // TODO: won't work on windows?
  while (actisvePath !== "/") {
    if (await exists(actisvePath)) return actisvePath;
    actisvePath = path.dirname(actisvePath);
  }
}
