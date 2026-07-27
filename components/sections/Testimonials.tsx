const testimonials = [
  {
    name: "Miracle Kalu",
    role: "First-time buyer",
    quote: "I found my dream car in under 10 minutes. The filters made it so easy.",
  },
  {
    name: "Maria Chen",
    role: "Car enthusiast",
    quote: "Being able to save favorites and compare later saved me hours of back-and-forth.",
  },
  {
    name: "David Smith",
    role: "Verified seller",
    quote: "The inquiry form connects me with serious buyers quickly. Highly recommended.",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-center text-3xl font-bold tracking-tight">What Our Users Say</h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-stone-600">
        Real feedback from buyers and sellers on AutoMarket.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <p className="italic text-stone-700">“{testimonial.quote}”</p>
            <div className="mt-4">
              <p className="font-bold">{testimonial.name}</p>
              <p className="text-sm text-stone-500">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
