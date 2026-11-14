const express = require("express");
const { currentUser } = require("./src/current-user");
const projects = require("./src/routes/projects");
const members = require("./src/routes/members");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api", currentUser);
app.use("/api/projects", projects);
app.use("/api/members", members);

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Tasklane API listening on port ${port}`));
}

module.exports = app;
