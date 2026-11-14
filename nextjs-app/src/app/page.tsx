import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col justify-center gap-6 p-8">
      <h1 className="text-4xl font-semibold">Tasklane</h1>
      <p className="text-lg text-zinc-600">Plan projects, assign work, ship on time.</p>
      <div className="flex gap-4">
        <Link href="/dashboard" className="rounded bg-black px-4 py-2 text-white">
          Open dashboard
        </Link>
        <Link href="/admin" className="rounded border px-4 py-2">
          Admin
        </Link>
      </div>
    </main>
  );
}
