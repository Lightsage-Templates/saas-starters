const express = require("express");
const digests = require("./src/routes/digests");

const app = express();
app.use(express.json());
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api", digests);

if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Tasklane Digest on http://localhost:${port}`));
}

module.exports = app;
