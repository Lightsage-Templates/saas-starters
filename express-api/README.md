# Tasklane API

Backend for Tasklane, a project tracker we sell to teams. Each customer is an
organization; its people are members with the role `admin` or `member`.

## Run

```sh
npm install
npm start        # http://localhost:3000
npm test
```

## Layout

- `app.js` - the Express app
- `src/db.js` - in-memory data (organizations, users, projects); Postgres in production
- `src/current-user.js` - who is calling (see below) and the `requireAdmin` check
- `src/routes/projects.js` - `GET /api/projects`, `GET /api/projects/:id`, `PATCH /api/projects/:id/settings`
- `src/routes/members.js` - `GET /api/members`, `POST /api/members`, `DELETE /api/members/:id`

## Auth

There is no real sign-in yet. Every `/api` request says who it is with an
`X-User-Id` header, and `src/current-user.js` trusts it. Try:

```sh
curl -H "X-User-Id: usr_1" localhost:3000/api/projects
```
