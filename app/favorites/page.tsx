"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CarCard from "@/components/CarCard";
import { useFavorites } from "@/hooks/useFavorites";
import { cars as staticCars, formatPrice, formatMileage, type Car } from "@/data/cars";

const MAX_COMPARE = 4;

const SPEC_ROWS: {
  label: string;
  value: (car: Car) => string;
  best?: (cars: Car[]) => (car: Car) => boolean;
}[] = [
  {
    label: "Price",
    value: (car) => formatPrice(car.price),
    best: (cars) => (car) => car.price === Math.min(...cars.map((c) => c.price)),
  },
  {
    label: "Year",
    value: (car) => String(car.year),
    best: (cars) => (car) => car.year === Math.max(...cars.map((c) => c.year)),
  },
  {
    label: "Mileage",
    value: (car) => formatMileage(car.mileage),
    best: (cars) => (car) => car.mileage === Math.min(...cars.map((c) => c.mileage)),
  },
  { label: "Fuel Type", value: (car) => car.fuelType },
  { label: "Transmission", value: (car) => car.transmission },
  { label: "Body Type", value: (car) => car.bodyType },
  {
    label: "Featured",
    value: (car) => (car.featured ? "Yes" : "No"),
  },
];

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  const [result, setResult] = useState<{ key: string; cars: Car[] } | null>(
    null
  );
  const [selection, setSelection] = useState<string[] | null>(null);

  const favoritesKey = favorites.join(",");
  const cars = result && result.key === favoritesKey ? result.cars : [];
  const loading = favorites.length > 0 && result?.key !== favoritesKey;

  useEffect(() => {
    if (favorites.length === 0) {
      return;
    }

    let cancelled = false;

    fetch(`/api/cars?ids=${favorites.map(encodeURIComponent).join(",")}`)
      .then((response) => (response.ok ? response.json() : []))
      .then((data: Car[]) => {
        if (cancelled) {
          return;
        }
        // Favorites saved from the home page use static dataset ids that the
        // database doesn't know; resolve those from the static fallback.
        const dbIds = new Set(data.map((car) => car.id));
        const staticMatches = staticCars.filter(
          (car) => favorites.includes(car.id) && !dbIds.has(car.id)
        );
        setResult({ key: favoritesKey, cars: [...data, ...staticMatches] });
      })
      .catch(() => {
        if (!cancelled) {
          setResult({ key: favoritesKey, cars: [] });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [favorites, favoritesKey]);

  // Null selection means "default": the first few favorites. Stale ids
  // (un-favorited or deleted cars) are pruned here.
  const compareIds = (
    selection ?? favorites.slice(0, Math.min(3, MAX_COMPARE))
  ).filter((id) => favorites.includes(id));

  const selectedCars = compareIds
    .map((id) => cars.find((car) => car.id === id))
    .filter((car): car is Car => Boolean(car));

  const toggleCompare = (id: string) => {
    const current =
      selection ?? favorites.slice(0, Math.min(3, MAX_COMPARE));
    setSelection(
      current.includes(id)
        ? current.filter((compareId) => compareId !== id)
        : current.length >= MAX_COMPARE
          ? current
          : [...current, id]
    );
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold">Your Favorites</h1>

      {loading ? (
        <p className="mt-4 text-stone-600">Loading your favorites…</p>
      ) : cars.length === 0 ? (
        <p className="mt-4 text-stone-600">
          You have not saved any cars yet. Browse the{" "}
          <Link href="/cars" className="font-semibold text-blue-600 hover:underline">
            listings
          </Link>{" "}
          and tap the heart on a car to save it here.
        </p>
      ) : (
        <>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                isFavorite={favorites.includes(car.id)}
                onToggleFavorite={() => toggleFavorite(car.id)}
              />
            ))}
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">Compare Specs</h2>
            <p className="mt-1 text-sm text-stone-600">
              Pick up to {MAX_COMPARE} cars to compare side by side. The best
              value in each row is highlighted.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {cars.map((car) => {
                const checked = compareIds.includes(car.id);
                const disabled = !checked && compareIds.length >= MAX_COMPARE;
                return (
                  <label
                    key={car.id}
                    className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                      checked
                        ? "border-stone-900 bg-stone-900 text-white"
                        : disabled
                          ? "cursor-not-allowed border-stone-200 text-stone-400"
                          : "border-stone-300 bg-white text-stone-700 hover:border-stone-500"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={disabled}
                      onChange={() => toggleCompare(car.id)}
                      className="sr-only"
                    />
                    {car.brand} {car.model}
                  </label>
                );
              })}
            </div>

            {selectedCars.length < 2 ? (
              <p className="mt-6 rounded-xl border border-dashed border-stone-300 bg-white py-10 text-center text-sm text-stone-500">
                Select at least 2 cars to see a side-by-side comparison.
              </p>
            ) : (
              <div className="mt-6 overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-stone-200">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-stone-500">
                        Spec
                      </th>
                      {selectedCars.map((car) => (
                        <th
                          key={car.id}
                          className="min-w-44 px-6 py-4 text-left align-top"
                        >
                          <div className="relative mb-3 h-20 w-32 overflow-hidden rounded-lg bg-stone-100">
                            <Image
                              src={car.image}
                              alt={`${car.brand} ${car.model}`}
                              fill
                              sizes="128px"
                              className="object-cover"
                            />
                          </div>
                          <Link
                            href={`/cars/${car.id}`}
                            className="text-sm font-bold text-stone-900 hover:underline"
                          >
                            {car.brand} {car.model}
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {SPEC_ROWS.map((row) => {
                      const isBest = row.best?.(selectedCars);
                      return (
                        <tr key={row.label} className="hover:bg-stone-50">
                          <td className="px-6 py-3 text-sm font-semibold text-stone-500">
                            {row.label}
                          </td>
                          {selectedCars.map((car) => (
                            <td
                              key={car.id}
                              className={`px-6 py-3 text-sm ${
                                isBest?.(car)
                                  ? "font-black text-stone-900"
                                  : "text-stone-700"
                              }`}
                            >
                              {row.value(car)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
