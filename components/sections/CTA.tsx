import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-black py-16 text-center text-white">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-bold tracking-tight">Ready to find your car?</h2>
        <p className="mt-4 text-lg text-white/80">
          Browse the full catalog and save your favorites today.
        </p>
        <Link
          href="/cars"
          className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition hover:bg-stone-200"
        >
          Start Browsing
        </Link>
      </div>
    </section>
  );
}
