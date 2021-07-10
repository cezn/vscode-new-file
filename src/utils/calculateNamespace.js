const path = require("path");

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

function calculateNamespace(destinationPath, csprojDirPath) {
  return normalizeNamespace(trimPath(destinationPath, csprojDirPath));
}
exports.calculateNamespace = calculateNamespace;
