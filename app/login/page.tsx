"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.message ?? "Failed to log in. Please try again.");
        return;
      }

      const next = searchParams.get("next");
      router.push(next && next.startsWith("/") ? next : "/");
      router.refresh();
    } catch {
      setError("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-semibold">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-semibold">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded border border-stone-300 px-3 py-2 text-sm outline-none focus:border-stone-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-stone-800 disabled:opacity-50"
      >
        {loading ? "Logging in…" : "Log in"}
      </button>

      <p className="text-center text-sm text-stone-600">
        Don&apos;t have an account?{" "}
        <Link
          href={`/signup${searchParams.get("next") ? `?next=${encodeURIComponent(searchParams.get("next")!)}` : ""}`}
          className="font-semibold text-black underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm rounded border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-black tracking-tight">Log in</h1>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
