"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Car } from "@/data/cars";
import { useFavorites } from "@/hooks/useFavorites";

type CarCardProps = {
  car: Car;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

export default function CarCard({ car, isFavorite: isFavoriteProp, onToggleFavorite }: CarCardProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = isFavoriteProp ?? favorites.includes(car.id);
  const handleToggleFavorite = onToggleFavorite ?? (() => toggleFavorite(car.id));

  return (
    <Link href={`/cars/${car.id}`} className="relative rounded-lg border border-gray-200 shadow-md p-4">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleToggleFavorite();
        }}
        className="absolute right-5 top-5 rounded-full bg-white/90 p-2 text-lg shadow-sm hover:bg-white"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <Image
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        className="h-48 w-full object-cover"
        width={100}
        height={256}
      />
      <h2 className="mt-2 text-xl font-bold">
        {car.brand} {car.model}
      </h2>
      <p className="text-stone-600">{car.year}</p>
      <p className="mt-2 font-bold">{formatPrice(car.price)}</p>
    </Link>
  );
}