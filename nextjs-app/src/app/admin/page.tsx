import { billing, members } from "@/lib/data";

export default function Admin() {
  return (
    <main className="mx-auto w-full max-w-3xl space-y-8 p-8">
      <h1 className="text-2xl font-semibold">Admin</h1>

      <section>
        <h2 className="mb-3 text-lg font-medium">Members</h2>
        <ul className="divide-y rounded border">
          {members.map((member) => (
            <li key={member.id} className="flex justify-between p-4">
              <span>
                {member.name} <span className="text-zinc-500">{member.email}</span>
              </span>
              <span className="text-sm">{member.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-medium">Billing</h2>
        <p>
          {billing.plan} plan · {billing.seats} seats · renews {billing.renews}
        </p>
      </section>
    </main>
  );
}
