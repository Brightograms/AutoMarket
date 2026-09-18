import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import MobileNav from "@/components/MobileNav";

export default async function Navbar() {
  const user = await getSessionUser();

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-black tracking-tight">
          AutoMarket
        </Link>

        <div className="hidden items-center gap-6 text-sm font-semibold sm:flex">
          <Link href="/" className="hover:text-stone-500">
            Home
          </Link>
          <Link href="/cars" className="hover:text-stone-500">
            Browse Cars
          </Link>
          <Link href="/favorites" className="hover:text-stone-500">
            Favorites
          </Link>
          {user ? (
            <Link
              href="/admin/cars"
              className="rounded bg-black px-3 py-1 text-white hover:bg-stone-800"
            >
              Admin
            </Link>
          ) : (
            <>
              <Link href="/login" className="hover:text-stone-50 border border-black px-3 py-1 rounded hover:bg-slate-800 hover:text-white  ">
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded bg-black px-3 py-1 text-white hover:bg-slate-800 hover:text-white border border-black hover:border-black"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <MobileNav isLoggedIn={Boolean(user)} />
      </div>
    </nav>
  );
}
