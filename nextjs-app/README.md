# Tasklane web app

The Tasklane web app (Next.js App Router). Pages:

- `/` - landing page
- `/dashboard` - the signed-in user's projects
- `/admin` - members and billing for the organization

There is no sign-in yet: every page is public and shows sample data from
`src/lib/data.ts`.

## Run

```sh
bun install
bun dev   # http://localhost:3000
```
