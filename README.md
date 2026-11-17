# SaaS starters

Small, realistic apps for eval runs: each looks like a product a team is
already building, with its own data and routes, so a task can ask for one
feature without describing the app first.

| Folder | Stack | What it is |
|---|---|---|
| `express-api` | Express 5 | Tasklane API: multi-tenant projects and members, in-memory data, header-based identity until real auth |
| `nextjs-app` | Next.js 16 | Tasklane web app: landing, dashboard and an admin page, no sign-in yet |
| `python-assistant` | FastAPI + OpenAI | Tasklane Assistant: an in-app chat assistant with a tool-calling loop, and support-ticket triage |
| `node-digest` | Express 5 + OpenAI | Tasklane Digest: weekly AI summaries of each project's task changes |
