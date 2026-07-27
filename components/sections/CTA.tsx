import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-white py-16 text-center text-black">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-bold tracking-tight">Ready to find your car?</h2>
        <p className="mt-4 text-lg text-stone-600">
          Browse the full catalog and save your favorites today.
        </p>
        <Link
          href="/cars"
          className="mt-8 inline-block rounded-full hover:bg-black px-8 py-3 text-sm font-bold text-white transition bg-gray-900"
        >
          Start Browsing
        </Link>
      </div>
    </section>
  );
}
