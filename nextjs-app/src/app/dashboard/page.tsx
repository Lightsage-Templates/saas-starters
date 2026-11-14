import { projects } from "@/lib/data";

export default function Dashboard() {
  return (
    <main className="mx-auto w-full max-w-3xl p-8">
      <h1 className="mb-6 text-2xl font-semibold">Your projects</h1>
      <ul className="divide-y rounded border">
        {projects.map((project) => (
          <li key={project.id} className="flex justify-between p-4">
            <span>{project.name}</span>
            <span className="text-sm text-zinc-500">
              {project.openTasks} open · updated {project.updated}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
