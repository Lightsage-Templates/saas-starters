const express = require("express");
const { projects } = require("../db");
const { digestFor } = require("../digest");

const router = express.Router();

router.post("/projects/:id/digest", async (req, res) => {
  const digest = await digestFor(req.params.id);
  if (!digest) return res.status(404).json({ error: "Project not found" });
  res.json(digest);
});

router.post("/digests/run", async (_req, res) => {
  const results = [];
  for (const project of projects) {
    results.push(await digestFor(project.id));
  }
  res.json({ digests: results });
});

module.exports = router;
