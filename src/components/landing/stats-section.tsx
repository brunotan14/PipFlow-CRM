const STATS = [
  {
    value: "+47%",
    label: "taxa de conversão",
    description: "Times que usam pipeline visual convertem mais",
    color: "text-indigo-400",
  },
  {
    value: "3.2x",
    label: "leads qualificados",
    description: "Mais oportunidades no funil com filtros inteligentes",
    color: "text-emerald-400",
  },
  {
    value: "−62%",
    label: "ciclo de venda",
    description: "Redução no tempo médio de fechamento",
    color: "text-indigo-400",
  },
  {
    value: "1.200+",
    label: "times ativos",
    description: "Empresas que já simplificaram o processo comercial",
    color: "text-emerald-400",
  },
];

export function StatsSection() {
  return (
    <section className="relative border-y border-zinc-800/60 bg-zinc-900/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        {/* Section label */}
        <p className="animate-fade-up mb-12 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Resultados reais de quem usa o PipeFlow
        </p>

        <div className="grid grid-cols-2 gap-px bg-zinc-800/60 rounded-2xl overflow-hidden lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="animate-fade-up flex flex-col items-center gap-2 bg-zinc-950 px-4 py-10 text-center sm:px-8"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className={`text-4xl font-black tracking-tight ${stat.color} sm:text-5xl lg:text-6xl`}>
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-zinc-200">
                {stat.label}
              </span>
              <p className="text-xs leading-relaxed text-zinc-500 max-w-[140px]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
