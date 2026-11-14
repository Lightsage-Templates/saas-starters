// In-memory data store. Replaced by Postgres in production; same shape.

const organizations = [
  { id: "org_acme", name: "Acme Corp", plan: "business" },
  { id: "org_globex", name: "Globex", plan: "team" },
];

const users = [
  { id: "usr_1", orgId: "org_acme", email: "dana@acme.com", name: "Dana Park", role: "admin" },
  { id: "usr_2", orgId: "org_acme", email: "lee@acme.com", name: "Lee Chen", role: "member" },
  { id: "usr_3", orgId: "org_globex", email: "sam@globex.com", name: "Sam Ortiz", role: "admin" },
];

const projects = [
  {
    id: "prj_1",
    orgId: "org_acme",
    name: "Website relaunch",
    settings: { visibility: "private", defaultAssigneeId: "usr_2", archived: false },
  },
  {
    id: "prj_2",
    orgId: "org_acme",
    name: "Q3 hiring",
    settings: { visibility: "org", defaultAssigneeId: null, archived: false },
  },
  {
    id: "prj_3",
    orgId: "org_globex",
    name: "Warehouse migration",
    settings: { visibility: "org", defaultAssigneeId: "usr_3", archived: false },
  },
];

let nextUserNumber = users.length + 1;

function newUserId() {
  return `usr_${nextUserNumber++}`;
}

module.exports = { organizations, users, projects, newUserId };
