// In-memory data store. Replaced by Postgres in production; same shape.

const projects = [
  { id: "prj_1", orgId: "org_acme", name: "Website relaunch" },
  { id: "prj_2", orgId: "org_acme", name: "Q3 hiring" },
  { id: "prj_3", orgId: "org_globex", name: "Warehouse migration" },
];

const taskEvents = [
  { projectId: "prj_1", task: "New pricing page copy", change: "moved to review", by: "Lee Chen", at: "2026-11-10" },
  { projectId: "prj_1", task: "Redirect old blog URLs", change: "completed", by: "Dana Park", at: "2026-11-11" },
  { projectId: "prj_1", task: "Cookie banner", change: "created", by: "Dana Park", at: "2026-11-12" },
  { projectId: "prj_2", task: "Post backend role", change: "completed", by: "Dana Park", at: "2026-11-13" },
  { projectId: "prj_3", task: "Count pallets in bay 4", change: "blocked: scanner broken", by: "Sam Ortiz", at: "2026-11-12" },
];

module.exports = { projects, taskEvents };
