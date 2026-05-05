import Link from "next/link";
import { Logo } from "@/components/landing/logo";
import { CurrentYear } from "@/components/landing/current-year";

const LINKS = [
  { label: "Termos de Uso", href: "/terms" },
  { label: "Privacidade", href: "/privacy" },
  { label: "Contato", href: "mailto:contato@pipeflow.com.br" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <Logo size="sm" />

        <ul className="flex flex-wrap items-center gap-6">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xs text-zinc-600 transition-colors hover:text-zinc-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-xs text-zinc-500">
          © <CurrentYear /> PipeFlow. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
