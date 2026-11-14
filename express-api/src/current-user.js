const db = require("./db");

// Temporary: until we add real sign-in, the caller says who they are with an
// X-User-Id header and we trust it. Every /api route goes through this.
function currentUser(req, res, next) {
  const user = db.users.find((u) => u.id === req.get("X-User-Id"));
  if (!user) {
    return res.status(401).json({ error: "Unknown user" });
  }
  req.user = user;
  req.orgId = user.orgId;
  next();
}

function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admins only" });
  }
  next();
}

module.exports = { currentUser, requireAdmin };
