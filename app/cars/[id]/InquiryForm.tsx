"use client";

import { useState } from "react";
import Link from "next/link";
import type { SessionUser } from "@/lib/auth";

type InquiryFormProps = {
  user: SessionUser | null;
  carId: string;
};

export default function InquiryForm({ user, carId }: InquiryFormProps) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!user) {
    const next = encodeURIComponent(`/cars/${carId}`);
    return (
      <div className="mt-10 rounded-lg border p-6">
        <h2 className="text-2xl font-bold">Inquire about this car</h2>
        <p className="mt-4 text-stone-600">
          Sign up or log in to send an inquiry to the seller. It only takes a
          minute.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/signup?next=${next}`}
            className="rounded bg-black px-6 py-2 text-center font-semibold text-white hover:bg-stone-800"
          >
            Sign up to inquire
          </Link>
          <Link
            href={`/login?next=${next}`}
            className="rounded border px-6 py-2 text-center font-semibold hover:bg-stone-100"
          >
            Log in
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mt-10 rounded-lg border p-6">
      <h2 className="text-2xl font-bold">Inquire about this car</h2>
      {submitted ? (
        <p className="mt-4 text-green-700">Thank you. We will contact you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="mt-1 w-full rounded border px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-black px-6 py-2 font-semibold text-white hover:bg-stone-800"
          >
            Send inquiry
          </button>
        </form>
      )}
    </div>
  );
}
