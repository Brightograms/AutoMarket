import Link from "next/link";

const categories = [
  { name: "Sedans", bodyType: "Sedan" },
  { name: "SUVs", bodyType: "SUV" },
  { name: "Trucks", bodyType: "Truck" },
  { name: "Coupes", bodyType: "Coupe" },
] as const;

export default function Categories({
  counts,
}: {
  counts: Record<string, number>;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-center text-3xl font-bold tracking-tight">Browse by Category</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-stone-600">
        Whatever you are looking for, we have a vehicle for your lifestyle.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((category) => {
          const count = counts[category.bodyType] ?? 0;
          return (
            <Link
              key={category.name}
              href="/cars"
              className="rounded-xl border bg-white p-6 text-center transition hover:border-black hover:shadow-sm"
            >
              <p className="text-lg font-bold">{category.name}</p>
              <p className="mt-1 text-sm text-stone-600">{count} cars</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
