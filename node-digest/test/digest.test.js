const test = require("node:test");
const assert = require("node:assert");
const { buildPrompt, weekFor } = require("../src/digest");

test("collects one project's week", () => {
  assert.strictEqual(weekFor("prj_1").length, 3);
});

test("prompt lists every change", () => {
  const prompt = buildPrompt({ name: "Q3 hiring" }, weekFor("prj_2"));
  assert.match(prompt, /Post backend role/);
});
