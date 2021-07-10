const fs = require("fs");
const findUp = require("find-up");

/**
 *
 * @param {string} activePath
 * @returns {Promise<string | undefined>} Directory path containng .csproj file
 */
async function findCsprojDir(activePath) {
  return await findUp(dir => fs.readdirSync(dir).some(f => f.endsWith(".csproj")) && dir, {
    cwd: activePath,
    type: "directory",
  });
}
exports.findCsprojDir = findCsprojDir;
