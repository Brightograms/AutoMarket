"use client";

import { useEffect, useMemo, useState } from "react";
import { type Car } from "@/data/cars";
import CarCard from "@/components/CarCard";

const sortOptions = [
  { label: "Featured first", value: "featured" },
  { label: "Price: Low to high", value: "price-asc" },
  { label: "Price: High to low", value: "price-desc" },
  { label: "Year: Newest first", value: "year-desc" },
];

export default function CarsPage() {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [brand, setBrand] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch("/api/cars");
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = (await response.json()) as Car[];
        setAllCars(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  const brands = useMemo(
    () => ["All", ...new Set(allCars.map((car) => car.brand))],
    [allCars]
  );

  const filteredCars = useMemo(() => {
    let result = allCars.filter((car) => {
      const matchesBrand = brand === "All" || car.brand === brand;

      const searchLower = search.toLowerCase();
      const matchesSearch =
        search === "" ||
        car.brand.toLowerCase().includes(searchLower) ||
        car.model.toLowerCase().includes(searchLower);

      return matchesBrand && matchesSearch;
    });

    switch (sort) {
      case "price-asc":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = result.sort((a, b) => b.price - a.price);
        break;
      case "year-desc":
        result = result.sort((a, b) => b.year - a.year);
        break;
      case "featured":
      default:
        result = result.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
    }

    return result;
  }, [allCars, brand, search, sort]);

  const hasActiveFilters = brand !== "All" || search !== "" || sort !== "featured";

  const clearFilters = () => {
    setBrand("All");
    setSearch("");
    setSort("featured");
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-center text-stone-600">Loading cars...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">Failed to load cars</p>
          <p className="mt-2 text-red-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 items-center">
        <h1 className="text-3xl font-bold">Browse Cars</h1>
        <p className="mt-2 text-stone-600">
          {filteredCars.length} {filteredCars.length === 1 ? "car" : "cars"} found
        </p>
      </div>

      <div className="mb-8 rounded-xl border bg-white p-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="search" className="mb-1 block text-sm font-semibold">
              Search
            </label>
            <input
              id="search"
              type="text"
              placeholder="Model or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded border px-3 py-0"
            />
          </div>

          <div>
            <label htmlFor="brand" className="mb-1 block text-sm font-semibold">
              Brand
            </label>
            <select
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full rounded border px-3 py-0.5"
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sort" className="mb-1 block text-sm font-semibold">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded border px-3 py-0.5"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="w-full rounded border px-3 py-1 text-sm font-semibold transition enabled:hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>

      {filteredCars.length === 0 ? (
        <div className="rounded-xl border border-gray-200 shadow-md bg-white py-16 text-center">
          <p className="text-lg font-semibold">No cars match your search.</p>
          <p className="mt-2 text-stone-600">Try changing your filters or search term.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded bg-black px-6 py-2 text-sm font-bold text-white hover:bg-stone-800"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </main>
  );
}
