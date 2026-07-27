import Link from "next/link";
import { cars } from "@/data/cars";
import CarCard from "@/components/CarCard";

const featuredCars = cars.filter((car) => car.featured);

export default function FeaturedCars() {
  return (
    <section className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Cars</h2>
            <p className="mt-2 text-stone-600">Handpicked vehicles worth a closer look.</p>
          </div>
          <Link
            href="/cars"
            className="hidden text-sm font-semibold text-stone-800 hover:text-stone-600 sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            href="/cars"
            className="block rounded-full bg-black px-6 py-3 text-center text-sm font-bold text-white"
          >
            View all cars
          </Link>
        </div>
      </div>
    </section>
  );
}
