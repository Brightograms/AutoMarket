const steps = [
  {
    title: "Search",
    description: "Filter by brand, fuel type, transmission, and price to narrow your options.",
  },
  {
    title: "Compare",
    description: "Save your favorites and compare specs side by side before deciding.",
  },
  {
    title: "Inquire",
    description: "Send a message directly from the listing page and hear back quickly.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-center text-3xl font-bold tracking-tight">How It Works</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-stone-600">
        From search to seller contact in three simple steps.
      </p>
      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.title} className="relative rounded-xl border bg-white p-6">
            <span className="absolute right-4 top-4 text-5xl font-black text-stone-100">
              {index + 1}
            </span>
            <h3 className="text-lg font-bold">{step.title}</h3>
            <p className="mt-2 text-sm text-stone-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
