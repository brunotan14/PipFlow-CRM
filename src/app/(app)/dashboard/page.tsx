import {
  Users,
  GitBranch,
  TrendingUp,
  DollarSign,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const METRIC_CARDS = [
  {
    title: "Total de Leads",
    value: "—",
    description: "Aguardando conexão",
    icon: Users,
    iconClass: "text-indigo-400",
    bgClass: "bg-indigo-950",
  },
  {
    title: "Negócios Abertos",
    value: "—",
    description: "Aguardando conexão",
    icon: GitBranch,
    iconClass: "text-emerald-400",
    bgClass: "bg-emerald-950",
  },
  {
    title: "Valor do Pipeline",
    value: "—",
    description: "Aguardando conexão",
    icon: DollarSign,
    iconClass: "text-amber-400",
    bgClass: "bg-amber-950",
  },
  {
    title: "Taxa de Conversão",
    value: "—",
    description: "Aguardando conexão",
    icon: TrendingUp,
    iconClass: "text-indigo-400",
    bgClass: "bg-indigo-950",
  },
] as const;

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {METRIC_CARDS.map(({ title, value, description, icon: Icon, iconClass, bgClass }) => (
          <Card
            key={title}
            className="border-zinc-800 bg-zinc-900"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                {title}
              </CardTitle>
              <div className={`rounded-md p-1.5 ${bgClass}`}>
                <Icon className={`h-4 w-4 ${iconClass}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-zinc-50">{value}</p>
              <p className="mt-1 text-xs text-zinc-500">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart + list area */}
      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="border-zinc-800 bg-zinc-900 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-300">
              Funil de Vendas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 rounded-md bg-zinc-800" style={{ width: `${90 - i * 12}%` }} />
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-300">
              Negócios com Prazo Próximo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full bg-zinc-800" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-3/4 rounded bg-zinc-800" />
                  <Skeleton className="h-2.5 w-1/2 rounded bg-zinc-800" />
                </div>
                <Skeleton className="h-5 w-14 rounded bg-zinc-800" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
