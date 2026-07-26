import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-black tracking-tight">
          AutoMarket
        </Link>

        <div className="flex items-center gap-6 text-sm font-semibold">
          <Link href="/" className="hover:text-stone-600">
            Home
          </Link>
          <Link href="/cars" className="hover:text-stone-600">
            Browse Cars
          </Link>
          <Link href="/favorites" className="hover:text-stone-600">
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}
