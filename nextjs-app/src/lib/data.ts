// Sample data until the app talks to the Tasklane API.

export type Project = { id: string; name: string; openTasks: number; updated: string };
export type Member = { id: string; name: string; email: string; role: "admin" | "member" };

export const projects: Project[] = [
  { id: "prj_1", name: "Website relaunch", openTasks: 12, updated: "2 hours ago" },
  { id: "prj_2", name: "Q3 hiring", openTasks: 4, updated: "yesterday" },
];

export const members: Member[] = [
  { id: "usr_1", name: "Dana Park", email: "dana@acme.com", role: "admin" },
  { id: "usr_2", name: "Lee Chen", email: "lee@acme.com", role: "member" },
];

export const billing = { plan: "Business", seats: 25, renews: "March 1" };
