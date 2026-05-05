import dynamic from "next/dynamic";
import { Users, GitBranch, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { UpcomingDeals } from "@/components/dashboard/upcoming-deals";
import {
  getDashboardMetrics,
  getFunnelData,
  getUpcomingDeals,
} from "@/lib/mock/dashboard";
import { formatCurrency } from "@/lib/mock/deals";

const FunnelChart = dynamic(
  () => import("@/components/dashboard/funnel-chart").then((m) => m.FunnelChart),
  { ssr: false }
);

export default function DashboardPage() {
  const metrics = getDashboardMetrics();
  const funnelData = getFunnelData();
  const upcomingDeals = getUpcomingDeals();

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total de Leads"
          value={String(metrics.totalLeads)}
          subtitle="leads cadastrados"
          icon={Users}
          iconColor="text-indigo-400"
          iconBg="bg-indigo-950"
        />
        <MetricCard
          title="Negócios Abertos"
          value={String(metrics.openDealsCount)}
          subtitle={`${formatCurrency(metrics.openDealsValue)} em aberto`}
          icon={GitBranch}
          iconColor="text-emerald-400"
          iconBg="bg-emerald-950"
          badge={{ label: "ativos", positive: true }}
        />
        <MetricCard
          title="Valor do Pipeline"
          value={formatCurrency(metrics.pipelineValue)}
          subtitle={`${metrics.closedWonCount} negócios fechados ganhos`}
          icon={DollarSign}
          iconColor="text-amber-400"
          iconBg="bg-amber-950"
          badge={{ label: `${formatCurrency(metrics.closedWonValue)} ganhos`, positive: true }}
        />
        <MetricCard
          title="Taxa de Conversão"
          value={`${metrics.conversionRate}%`}
          subtitle="fechados ganhos vs. perdidos"
          icon={TrendingUp}
          iconColor="text-blue-400"
          iconBg="bg-blue-950"
          badge={{ label: `${metrics.closedWonCount} ganhos`, positive: true }}
        />
      </div>

      {/* Chart + upcoming deals */}
      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="border-zinc-800 bg-zinc-900 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-300">
              Funil de Vendas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FunnelChart data={funnelData} />
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-300">
              Negócios com Prazo Próximo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UpcomingDeals deals={upcomingDeals} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
