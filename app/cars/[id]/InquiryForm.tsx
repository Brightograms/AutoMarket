"use client";

import { useState } from "react";

export default function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
