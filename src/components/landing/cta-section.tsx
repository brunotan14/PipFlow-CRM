import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-glow-pulse absolute left-1/2 top-1/2 h-96 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-grid-dots opacity-20" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="animate-fade-up mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
          Pronto para começar?
        </p>
        <h2 className="animate-fade-up animation-delay-100 mb-6 text-4xl font-extrabold tracking-tight text-zinc-50 lg:text-5xl">
          Seu pipeline organizado{" "}
          <span className="text-gradient-indigo">em menos de 5 minutos</span>
        </h2>
        <p className="animate-fade-up animation-delay-200 mb-10 text-lg text-zinc-400">
          Junte-se a mais de 1.200 times que já deixaram as planilhas para trás. Comece grátis, sem cartão de crédito.
        </p>

        <div className="animate-fade-up animation-delay-300 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/register"
            className="group flex items-center gap-2 rounded-lg bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-500/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/50 hover:gap-3"
          >
            Criar conta grátis
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
