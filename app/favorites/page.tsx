"use client";

import { cars } from "@/data/cars";
import CarCard from "@/components/CarCard";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  const favoriteCars = cars.filter((car) => favorites.includes(car.id));

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold">Your Favorites</h1>

      {favoriteCars.length === 0 ? (
        <p className="mt-4 text-stone-600">
          You have not saved any cars yet.
        </p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </main>
  );
}