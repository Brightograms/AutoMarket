import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center px-6 text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80"
          alt="Luxury car on a scenic road"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
          Find Your Next Car
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
          Browse premium vehicles, filter by what matters, and connect with
          sellers directly.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/cars"
            className="rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition hover:bg-stone-200"
          >
            Browse Cars
          </Link>
          <Link
            href="/favorites"
            className="rounded-full border border-white/60 bg-transparent px-8 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            View Favorites
          </Link>
        </div>
      </div>
    </section>
  );
}
