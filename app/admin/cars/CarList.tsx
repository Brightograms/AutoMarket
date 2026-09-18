"use client";

import Image from "next/image";
import { type Car } from "@/data/cars";

type CarListProps = {
  cars: Car[];
  onEdit: (car: Car) => void;
  onDelete: (id: string) => void;
  disabled?: boolean;
};

export default function CarList({
  cars,
  onEdit,
  onDelete,
  disabled = false,
}: CarListProps) {
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this car?")) {
      onDelete(id);
    }
  };

  if (cars.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-stone-300 bg-white py-16 text-center">
        <p className="font-semibold text-stone-900">No cars yet</p>
        <p className="mt-1 text-sm text-stone-500">
          You haven&apos;t added any cars. Use the form above to add your first
          listing.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-stone-200">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-stone-500">
                Car
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-stone-500">
                Year
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-stone-500">
                Price
              </th>
              <th className="px-6 py-3 text-center text-xs font-bold uppercase tracking-wider text-stone-500">
                Featured
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider text-stone-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {cars.map((car) => (
              <tr key={car.id} className="transition-colors hover:bg-stone-50">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                      <Image
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        {car.brand} {car.model}
                      </p>
                      <p className="text-xs text-stone-500">
                        {car.bodyType} · {car.fuelType} ·{" "}
                        {car.mileage.toLocaleString()} mi
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3 text-sm text-stone-700">{car.year}</td>
                <td className="px-6 py-3 text-right text-sm font-semibold text-stone-900">
                  ${car.price.toLocaleString()}
                </td>
                <td className="px-6 py-3 text-center">
                  {car.featured ? (
                    <span className="inline-block rounded-full bg-stone-900 px-2.5 py-0.5 text-xs font-semibold text-white">
                      Featured
                    </span>
                  ) : (
                    <span className="text-sm text-stone-400">—</span>
                  )}
                </td>
                <td className="px-6 py-3 text-right text-sm">
                  <button
                    onClick={() => onEdit(car)}
                    disabled={disabled}
                    className="mr-2 rounded-lg border border-stone-300 px-3 py-1.5 font-semibold text-stone-700 transition-colors hover:border-stone-500 hover:text-stone-900 disabled:opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
                    disabled={disabled}
                    className="rounded-lg border border-red-200 px-3 py-1.5 font-semibold text-red-600 transition-colors hover:border-red-400 hover:bg-red-50 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
