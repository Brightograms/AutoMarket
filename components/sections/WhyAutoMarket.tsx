const features = [
  {
    icon: "🔍",
    title: "Smart Search",
    description: "Filter by brand, price, fuel type, and more to find the perfect match.",
  },
  {
    icon: "❤️",
    title: "Save Favorites",
    description: "Bookmark cars you love and compare them later from any device.",
  },
  {
    icon: "📩",
    title: "Easy Inquiry",
    description: "Contact sellers directly through a simple inquiry form on every listing.",
  },
];

export default function WhyAutoMarket() {
  return (
    <section className="border-t bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Why AutoMarket?</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg text-white">
                {feature.icon}
              </div>
              <h3 className="font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm text-stone-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
