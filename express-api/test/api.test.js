const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const app = require("../app");

let server;
let base;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

test("lists only the caller's organization's projects", async () => {
  const res = await fetch(`${base}/api/projects`, { headers: { "X-User-Id": "usr_3" } });
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.deepEqual(body.map((p) => p.id), ["prj_3"]);
});

test("rejects unknown callers", async () => {
  const res = await fetch(`${base}/api/projects`);
  assert.equal(res.status, 401);
});

test("changes a project's settings", async () => {
  const res = await fetch(`${base}/api/projects/prj_1/settings`, {
    method: "PATCH",
    headers: { "X-User-Id": "usr_1", "Content-Type": "application/json" },
    body: JSON.stringify({ visibility: "org" }),
  });
  assert.equal(res.status, 200);
  assert.equal((await res.json()).settings.visibility, "org");
});
