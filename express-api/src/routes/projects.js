const express = require("express");
const db = require("../db");

const router = express.Router();

// GET /api/projects - the caller's organization's projects
router.get("/", (req, res) => {
  res.json(db.projects.filter((p) => p.orgId === req.orgId));
});

// GET /api/projects/:id
router.get("/:id", (req, res) => {
  const project = db.projects.find((p) => p.id === req.params.id && p.orgId === req.orgId);
  if (!project) return res.status(404).json({ error: "Not found" });
  res.json(project);
});

// PATCH /api/projects/:id/settings - change visibility, default assignee or archived
router.patch("/:id/settings", (req, res) => {
  const project = db.projects.find((p) => p.id === req.params.id && p.orgId === req.orgId);
  if (!project) return res.status(404).json({ error: "Not found" });

  const allowed = ["visibility", "defaultAssigneeId", "archived"];
  const changes = Object.fromEntries(
    Object.entries(req.body || {}).filter(([key]) => allowed.includes(key))
  );
  if (Object.keys(changes).length === 0) {
    return res.status(400).json({ error: `Send one of: ${allowed.join(", ")}` });
  }

  project.settings = { ...project.settings, ...changes };
  res.json(project);
});

module.exports = router;
