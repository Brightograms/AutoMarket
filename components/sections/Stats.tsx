const stats = (vehiclesListed: number) => [
  { label: "Vehicles Listed", value: vehiclesListed },
  { label: "Verified Sellers", value: 12 },
  { label: "Happy Buyers", value: "340+" },
  { label: "Average Response", value: "2 hrs" },
];

export default function Stats({ vehiclesListed }: { vehiclesListed: number }) {
  return (
    <section className="border-b bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
        {stats(vehiclesListed).map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-black">{stat.value}</p>
            <p className="mt-1 text-sm text-stone-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
