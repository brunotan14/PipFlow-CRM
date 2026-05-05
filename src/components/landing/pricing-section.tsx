import Link from "next/link";
import { Check, Zap } from "lucide-react";

const FREE_FEATURES = [
  "Até 2 colaboradores",
  "Até 50 leads",
  "Pipeline Kanban",
  "Histórico de atividades",
  "Dashboard básico",
  "Suporte por e-mail",
];

const PRO_FEATURES = [
  "Colaboradores ilimitados",
  "Leads ilimitados",
  "Pipeline Kanban avançado",
  "Histórico de atividades",
  "Dashboard completo com métricas",
  "Multi-workspace",
  "Exportação de dados",
  "Suporte prioritário",
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-28 scroll-mt-16">
      {/* Subtle radial bg */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[800px] rounded-full bg-indigo-600/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="animate-fade-up mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Planos
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-zinc-50 lg:text-5xl">
            Comece grátis,{" "}
            <span className="text-gradient-indigo">escale quando crescer</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-zinc-400">
            Sem taxas escondidas. Cancele quando quiser.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Free Plan */}
          <div className="animate-fade-up rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8">
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
                Grátis
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-5xl font-black text-zinc-50">R$ 0</span>
                <span className="text-zinc-500">/mês</span>
              </div>
              <p className="mt-2 text-sm text-zinc-500">
                Para começar e testar sem compromisso
              </p>
            </div>

            <Link
              href="/register"
              className="mb-8 block w-full rounded-lg border border-zinc-700 py-3 text-center text-sm font-semibold text-zinc-200 transition-all hover:border-zinc-600 hover:bg-zinc-800"
            >
              Criar conta grátis
            </Link>

            <ul className="space-y-3">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <Check className="h-4 w-4 flex-shrink-0 text-zinc-500" />
                  <span className="text-sm text-zinc-400">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="animate-fade-up animation-delay-100 relative rounded-2xl border-glow-indigo border border-indigo-500/50 bg-zinc-900/80 p-8">
            {/* Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1.5 rounded-full bg-indigo-600 px-4 py-1 shadow-lg shadow-indigo-500/40">
                <Zap className="h-3 w-3 text-indigo-200" />
                <span className="text-xs font-bold text-white">Mais popular</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
                Pro
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-5xl font-black text-zinc-50">R$ 49</span>
                <span className="text-zinc-500">/mês</span>
              </div>
              <p className="mt-2 text-sm text-zinc-500">
                Para times que querem escalar as vendas
              </p>
            </div>

            <Link
              href="/register"
              className="mb-8 block w-full rounded-lg bg-indigo-600 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/50"
            >
              Começar com Pro
            </Link>

            <ul className="space-y-3">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <Check className="h-4 w-4 flex-shrink-0 text-indigo-400" />
                  <span className="text-sm text-zinc-300">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fine print */}
        <p className="animate-fade-up mt-8 text-center text-sm text-zinc-600">
          Todos os planos incluem SSL, backups automáticos e atualizações sem custo adicional.
        </p>
      </div>
    </section>
  );
}
