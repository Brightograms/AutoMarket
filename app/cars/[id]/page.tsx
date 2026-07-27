"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cars, formatPrice, formatMileage } from "@/data/cars";

export default function CarPage() {
  const params = useParams();
  const id = params.id as string;

  const car = cars.find((c) => c.id === id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!car) {
    notFound();
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
        <main className="mx-auto max-w-4xl px-6 py-12">
      <Image
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        width={800}
        height={500}
        className="w-full rounded-lg object-cover"
      />
      <h1 className="mt-6 text-3xl font-bold">
        {car.year} {car.brand} {car.model}
      </h1>
      <p className="mt-2 text-2xl font-bold text-stone-800">
        {formatPrice(car.price)}
      </p>
      <p className="mt-4 text-stone-600">{car.description}</p>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-stone-500">Mileage</p>
          <p className="font-semibold">{formatMileage(car.mileage)}</p>
        </div>
        <div>
          <p className="text-sm text-stone-500">Fuel</p>
          <p className="font-semibold">{car.fuelType}</p>
        </div>
        <div>
          <p className="text-sm text-stone-500">Transmission</p>
          <p className="font-semibold">{car.transmission}</p>
        </div>
      </div>
      <Link href="/cars" className="mt-6 inline-block text-blue-600 hover:underline">
        Back to browse
      </Link>
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
    </main>
  );
}