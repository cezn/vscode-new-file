const path = require("path");
const { findCsprojDir } = require("./findCsprojDir");

function trimPath(srcPath, segmentsToTrim) {
  if (segmentsToTrim == null) segmentsToTrim = "";
  return path.dirname(srcPath.substr(segmentsToTrim.lastIndexOf(path.sep) + 1));
}

function normalizeNamespace(ns) {
  return ns
    .replace(new RegExp(`\\${path.sep}`, "g"), ".")
    .replace(/\s+/g, "_")
    .replace(/-/g, "_")
    .replace(/^\.|\.$/g, "");
}

async function getNamespaceForFile(destinationPath) {
  const csprojDirPath = await findCsprojDir(destinationPath);
  return calculateNamespace(destinationPath, csprojDirPath);
}

function calculateNamespace(destinationPath, csprojDirPath) {
  return normalizeNamespace(trimPath(destinationPath, csprojDirPath));
}

exports.calculateNamespace = calculateNamespace;
exports.getNamespaceForFile = getNamespaceForFile;
