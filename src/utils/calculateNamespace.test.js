const assert = require("assert");
const { calculateNamespace } = require("./getNamespaceForFile");

(async function calculates_namespace() {
  const result = await calculateNamespace("/home/user1/proj1/classes/NewClass1.cs", "/home/user1/proj1");
  assert.strictEqual(result, "proj1.classes");
})();

(async function calculates_namespace_when_outside_csproj() {
  const result = await calculateNamespace("/home/user1/proj1/classes/NewClass1.cs", null);
  assert.strictEqual(result, "home.user1.proj1.classes");
})();
