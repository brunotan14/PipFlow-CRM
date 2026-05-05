import {
  Kanban,
  Users,
  BarChart3,
  MessageSquare,
  Building2,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Kanban,
    title: "Pipeline Kanban Visual",
    description:
      "Arraste e solte negócios entre etapas. Visualize seu funil inteiro de um olhar e saiba exatamente onde cada oportunidade está.",
    accent: "bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20",
  },
  {
    icon: Users,
    title: "Gestão de Leads",
    description:
      "Cadastre, filtre e acompanhe cada lead com dados completos: empresa, cargo, histórico de contato e status atualizado.",
    accent: "bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20",
  },
  {
    icon: BarChart3,
    title: "Dashboard de Métricas",
    description:
      "KPIs de vendas em tempo real: taxa de conversão, valor do pipeline, ciclo médio e gráfico de funil por etapa.",
    accent: "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20",
  },
  {
    icon: MessageSquare,
    title: "Histórico de Atividades",
    description:
      "Timeline completa por lead: ligações, e-mails, reuniões e notas. Nunca mais esqueça o contexto de uma conversa.",
    accent: "bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20",
  },
  {
    icon: Building2,
    title: "Multi-workspace",
    description:
      "Gerencie múltiplas empresas ou times em um único login. Convide colaboradores com papéis de admin ou membro.",
    accent: "bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20",
  },
  {
    icon: Zap,
    title: "Setup em 2 minutos",
    description:
      "Sem configuração complicada. Crie sua conta, nomeie o workspace e já comece a adicionar leads. Zero curva de aprendizado.",
    accent: "bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="animate-fade-up mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Funcionalidades
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-zinc-50 lg:text-5xl">
            Tudo que seu time precisa para{" "}
            <span className="text-gradient-indigo">vender mais</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
            Sem bloatware. Sem features desnecessárias. Só o essencial para organizar o processo comercial e fechar mais negócios.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="animate-fade-up group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900"
                style={{ animationDelay: `${(i % 3) * 100}ms` }}
              >
                <div className={`mb-4 inline-flex rounded-xl p-3 transition-colors ${feature.accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-zinc-100">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
