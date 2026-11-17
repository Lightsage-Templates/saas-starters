# Tasklane Digest

The service behind Tasklane's weekly digest emails. For each project it collects
the week's task changes and asks OpenAI to write a short summary for the team,
then the email job sends it.

## Run

```sh
npm install
export OPENAI_API_KEY=...
npm start        # http://localhost:3001
npm test
```

## Layout

- `app.js` - the Express app
- `src/db.js` - in-memory data (projects, task events); Postgres in production
- `src/digest.js` - builds the prompt from a project's week and calls OpenAI
- `src/routes/digests.js` - `POST /api/projects/:id/digest` (one project), `POST /api/digests/run` (every project, used by the weekly cron)

## Try it

```sh
curl -s -X POST localhost:3001/api/projects/prj_1/digest
```
