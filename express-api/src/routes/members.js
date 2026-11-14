const express = require("express");
const db = require("../db");
const { requireAdmin } = require("../current-user");

const router = express.Router();

// GET /api/members - people in the caller's organization
router.get("/", (req, res) => {
  res.json(db.users.filter((u) => u.orgId === req.orgId));
});

// POST /api/members - admins invite someone by email
router.post("/", requireAdmin, (req, res) => {
  const { email, name, role = "member" } = req.body || {};
  if (!email) return res.status(400).json({ error: "email is required" });
  const user = { id: db.newUserId(), orgId: req.orgId, email, name: name || email, role };
  db.users.push(user);
  res.status(201).json(user);
});

// DELETE /api/members/:id - admins remove someone
router.delete("/:id", requireAdmin, (req, res) => {
  const index = db.users.findIndex((u) => u.id === req.params.id && u.orgId === req.orgId);
  if (index === -1) return res.status(404).json({ error: "Not found" });
  db.users.splice(index, 1);
  res.status(204).end();
});

module.exports = router;
