"use client";

import { useState } from "react";
import { type Car } from "@/data/cars";

type CarFormData = Omit<Car, "id">;

const emptyCar: CarFormData = {
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  price: 0,
  mileage: 0,
  fuelType: "Petrol",
  transmission: "Automatic",
  bodyType: "Sedan",
  image: "",
  description: "",
  featured: false,
};

type CarFormProps = {
  initialCar?: Car | null;
  onSubmit: (car: CarFormData, id?: string) => void;
  onCancel: () => void;
  disabled?: boolean;
};

const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"] as const;
const transmissions = ["Automatic", "Manual"] as const;
const bodyTypes = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Wagon"] as const;

export default function CarForm({
  initialCar,
  onSubmit,
  onCancel,
  disabled = false,
}: CarFormProps) {
  const [form, setForm] = useState<CarFormData>(() => {
    if (initialCar) {
      const { id: _id, ...rest } = initialCar;
      return rest;
    }
    return emptyCar;
  });
  const isEditing = Boolean(initialCar);

  const updateField = <K extends keyof CarFormData>(
    field: K,
    value: CarFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, initialCar?.id);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-xl border bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-bold">
        {isEditing ? "Edit Car" : "Add New Car"}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-semibold">Brand</label>
          <input
            type="text"
            value={form.brand}
            onChange={(e) => updateField("brand", e.target.value)}
            required
            disabled={disabled}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none transition-colors focus:border-stone-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Model</label>
          <input
            type="text"
            value={form.model}
            onChange={(e) => updateField("model", e.target.value)}
            required
            disabled={disabled}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none transition-colors focus:border-stone-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Year</label>
          <input
            type="number"
            value={form.year}
            onChange={(e) => updateField("year", Number(e.target.value))}
            required
            disabled={disabled}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none transition-colors focus:border-stone-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Price (USD)</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => updateField("price", Number(e.target.value))}
            required
            disabled={disabled}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none transition-colors focus:border-stone-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Mileage</label>
          <input
            type="number"
            value={form.mileage}
            onChange={(e) => updateField("mileage", Number(e.target.value))}
            required
            disabled={disabled}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none transition-colors focus:border-stone-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Fuel Type</label>
          <select
            value={form.fuelType}
            onChange={(e) =>
              updateField("fuelType", e.target.value as CarFormData["fuelType"])
            }
            disabled={disabled}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none transition-colors focus:border-stone-500"
          >
            {fuelTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Transmission</label>
          <select
            value={form.transmission}
            onChange={(e) =>
              updateField(
                "transmission",
                e.target.value as CarFormData["transmission"]
              )
            }
            disabled={disabled}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none transition-colors focus:border-stone-500"
          >
            {transmissions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Body Type</label>
          <select
            value={form.bodyType}
            onChange={(e) =>
              updateField("bodyType", e.target.value as CarFormData["bodyType"])
            }
            disabled={disabled}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none transition-colors focus:border-stone-500"
          >
            {bodyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label className="mb-1 block text-sm font-semibold">Image URL</label>
          <input
            type="text"
            value={form.image}
            onChange={(e) => updateField("image", e.target.value)}
            required
            disabled={disabled}
            placeholder="https://images.unsplash.com/..."
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none transition-colors focus:border-stone-500"
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <label className="mb-1 block text-sm font-semibold">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            required
            disabled={disabled}
            rows={3}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none transition-colors focus:border-stone-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={form.featured}
            onChange={(e) => updateField("featured", e.target.checked)}
            disabled={disabled}
            className="h-4 w-4"
          />
          <label htmlFor="featured" className="text-sm font-semibold">
            Featured
          </label>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={disabled}
          className="rounded bg-black px-6 py-2 font-semibold text-white hover:bg-stone-800 disabled:opacity-50"
        >
          {isEditing ? "Update Car" : "Add Car"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            disabled={disabled}
            className="rounded border px-6 py-2 font-semibold hover:bg-stone-100 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
