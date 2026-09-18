import { getSessionUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function Footer() {
  const user = await getSessionUser();

  return (
    <footer className="mt-auto border-t py-8 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-black">
          © 2026 AutoMarket
        </p>

        {user && (
          <div className="flex items-center gap-3 text-sm font-semibold">
            <span className="text-stone-500">{user.name}</span>
            <LogoutButton />
          </div>
        )}
      </div>
    </footer>
  );
}
