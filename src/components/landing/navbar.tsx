import Link from "next/link";
import { Logo } from "@/components/landing/logo";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo size="lg" />

        {/* Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {[
            { label: "Funcionalidades", href: "#features" },
            { label: "Preços", href: "#pricing" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-zinc-50"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-50 sm:block"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40"
          >
            Começar grátis
          </Link>
        </div>
      </nav>
    </header>
  );
}
