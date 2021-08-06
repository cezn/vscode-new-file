const path = require("path");
const { findCsprojDir } = require("./findCsprojDir");

function makeCsprojRelativePath(csprojDirPath, dstDirPath) {
  if (csprojDirPath == null) csprojDirPath = "";
  csprojDirPath = csprojDirPath.replace(/\/$/, "");
  dstDirPath = dstDirPath.replace(/\/$/, "");

  const result = dstDirPath.substr(csprojDirPath.lastIndexOf(path.sep) + 1);

  return result;
}

function pathToNamespace(ns) {
  return ns
    .replace(new RegExp(`\\${path.sep}`, "g"), ".")
    .replace(/\s+/g, "_")
    .replace(/-/g, "_")
    .replace(/^\.|\.$/g, "");
}

async function getNamespaceForDir(dstDirPath) {
  const csprojDirPath = await findCsprojDir(dstDirPath);
  console.log("dstDir", dstDirPath);
  console.log("csprojDirPath", csprojDirPath);
  const csprojRelativePath = makeCsprojRelativePath(csprojDirPath, dstDirPath);
  console.log("csprojRelativePath", csprojRelativePath);
  const ns = pathToNamespace(csprojRelativePath);
  return ns;
}

function calculateNamespace(dstDirPath, csprojDirPath) {
  const csprojRelativePath = makeCsprojRelativePath(csprojDirPath, dstDirPath);
  const ns = pathToNamespace(csprojRelativePath);
  return ns;
}

exports.getNamespaceForDir = getNamespaceForDir;
exports.calculateNamespace = calculateNamespace;
