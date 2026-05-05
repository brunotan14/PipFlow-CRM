import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const KANBAN_PREVIEW = [
  {
    stage: "Novo Lead",
    color: "text-zinc-400",
    dot: "bg-zinc-500",
    deals: [
      { title: "Rede Paulista LTDA", value: "R$ 8.400", tag: "E-mail enviado", tagColor: "bg-zinc-800 text-zinc-300" },
      { title: "Studio Velox", value: "R$ 3.200", tag: "Aguardando", tagColor: "bg-zinc-800 text-zinc-300" },
    ],
  },
  {
    stage: "Proposta Enviada",
    color: "text-amber-400",
    dot: "bg-amber-400",
    deals: [
      { title: "Grupo Meridian", value: "R$ 24.000", tag: "Hoje", tagColor: "bg-amber-950 text-amber-400" },
      { title: "Nexus Digital", value: "R$ 12.500", tag: "2 dias", tagColor: "bg-zinc-800 text-zinc-300" },
    ],
  },
  {
    stage: "Fechado Ganho",
    color: "text-emerald-400",
    dot: "bg-emerald-400",
    deals: [
      { title: "Alfa Soluções", value: "R$ 18.900", tag: "Ganho ✓", tagColor: "bg-emerald-950 text-emerald-400" },
    ],
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-dots opacity-40" />
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-glow-pulse absolute left-1/2 top-0 h-96 w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-indigo-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: Copy */}
          <div className="flex flex-col items-start">
            {/* Eyebrow badge */}
            <div className="animate-fade-up mb-6 flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span className="text-xs font-medium text-indigo-300">
                CRM para times de vendas modernos
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up animation-delay-100 mb-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-balance text-zinc-50 sm:text-5xl lg:text-6xl">
              Feche mais negócios.{" "}
              <span className="text-gradient-indigo">
                Perca zero oportunidades.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-up animation-delay-200 mb-10 max-w-lg text-lg leading-relaxed text-zinc-400">
              Pipeline Kanban visual, gestão completa de leads e métricas em tempo real — tudo que seu time comercial precisa para vender mais, sem planilha.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up animation-delay-300 flex flex-wrap items-center gap-4">
              <Link
                href="/register"
                className="group flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/50 hover:gap-3"
              >
                Começar grátis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#features"
                className="flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-600 hover:bg-zinc-800/50 hover:text-zinc-50"
              >
                Ver funcionalidades
              </Link>
            </div>

            {/* Social proof pill */}
            <p className="animate-fade-up animation-delay-400 mt-8 text-sm text-zinc-500">
              Grátis para sempre · Sem cartão de crédito · Setup em 2 minutos
            </p>
          </div>

          {/* Right: Mini Kanban Mockup */}
          <div className="animate-fade-up animation-delay-300 relative hidden lg:block">
            {/* Floating glow behind the mockup */}
            <div className="animate-glow-pulse absolute inset-0 -m-8 rounded-3xl bg-indigo-600/10 blur-2xl" />

            <div className="animate-float relative rounded-2xl border border-zinc-700/60 bg-zinc-900/90 p-4 shadow-2xl backdrop-blur-sm">
              {/* Mockup top bar */}
              <div className="mb-4 flex items-center gap-2 border-b border-zinc-800 pb-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <div className="flex-1 rounded bg-zinc-800 px-3 py-1">
                  <p className="text-center text-[10px] text-zinc-500">pipeflow.com.br/pipeline</p>
                </div>
              </div>

              {/* Kanban columns */}
              <div className="flex gap-3">
                {KANBAN_PREVIEW.map((col) => (
                  <div key={col.stage} className="flex w-44 flex-shrink-0 flex-col gap-2">
                    {/* Column header */}
                    <div className="flex items-center gap-1.5 px-1">
                      <span className={`h-1.5 w-1.5 rounded-full ${col.dot}`} />
                      <span className={`text-[10px] font-semibold uppercase tracking-widest ${col.color}`}>
                        {col.stage}
                      </span>
                    </div>

                    {/* Deal cards */}
                    {col.deals.map((deal) => (
                      <div
                        key={deal.title}
                        className="rounded-lg border border-zinc-700/60 bg-zinc-800/80 p-3 transition-colors hover:border-zinc-600"
                      >
                        <p className="mb-2 text-[11px] font-medium text-zinc-200 leading-tight">
                          {deal.title}
                        </p>
                        <div className="flex items-center justify-between gap-1">
                          <span className="rounded bg-emerald-950 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                            {deal.value}
                          </span>
                          <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${deal.tagColor}`}>
                            {deal.tag}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Add button */}
                    <button type="button" className="rounded-lg border border-dashed border-zinc-700 py-2 text-[10px] text-zinc-600 transition-colors hover:border-zinc-600 hover:text-zinc-400">
                      + Novo negócio
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
