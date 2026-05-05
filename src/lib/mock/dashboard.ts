import { MOCK_LEADS } from "@/lib/mock/leads";
import { MOCK_DEALS, STAGE_CONFIG } from "@/lib/mock/deals";
import { type DealStage } from "@/types/database";

const STAGE_HEX: Record<DealStage, string> = {
  new_lead: "#60a5fa",
  contacted: "#22d3ee",
  proposal_sent: "#fbbf24",
  negotiation: "#fb923c",
  closed_won: "#34d399",
  closed_lost: "#f87171",
};

export interface DashboardMetrics {
  totalLeads: number;
  openDealsCount: number;
  openDealsValue: number;
  pipelineValue: number;
  conversionRate: number;
  closedWonCount: number;
  closedWonValue: number;
}

export interface FunnelDataItem {
  stage: DealStage;
  label: string;
  count: number;
  value: number;
  fill: string;
}

export type UpcomingDeal = (typeof MOCK_DEALS)[number] & { due_date: string };

export function getDashboardMetrics(): DashboardMetrics {
  const totalLeads = MOCK_LEADS.length;

  const openDeals = MOCK_DEALS.filter(
    (d) => d.stage !== "closed_won" && d.stage !== "closed_lost"
  );
  const openDealsCount = openDeals.length;
  const openDealsValue = openDeals.reduce((s, d) => s + (d.value ?? 0), 0);

  const pipelineValue = MOCK_DEALS.filter((d) => d.stage !== "closed_lost").reduce(
    (s, d) => s + (d.value ?? 0),
    0
  );

  const closedWon = MOCK_DEALS.filter((d) => d.stage === "closed_won");
  const closedLost = MOCK_DEALS.filter((d) => d.stage === "closed_lost");
  const total = closedWon.length + closedLost.length;
  const conversionRate = total > 0 ? Math.round((closedWon.length / total) * 100) : 0;

  return {
    totalLeads,
    openDealsCount,
    openDealsValue,
    pipelineValue,
    conversionRate,
    closedWonCount: closedWon.length,
    closedWonValue: closedWon.reduce((s, d) => s + (d.value ?? 0), 0),
  };
}

export function getFunnelData(): FunnelDataItem[] {
  const stages: DealStage[] = [
    "new_lead",
    "contacted",
    "proposal_sent",
    "negotiation",
    "closed_won",
  ];
  return stages.map((stage) => {
    const stageDeals = MOCK_DEALS.filter((d) => d.stage === stage);
    return {
      stage,
      label: STAGE_CONFIG[stage].label,
      count: stageDeals.length,
      value: stageDeals.reduce((s, d) => s + (d.value ?? 0), 0),
      fill: STAGE_HEX[stage],
    };
  });
}

export function getUpcomingDeals(limit = 5): UpcomingDeal[] {
  return MOCK_DEALS.filter(
    (d): d is UpcomingDeal =>
      d.due_date !== null &&
      d.stage !== "closed_won" &&
      d.stage !== "closed_lost"
  )
    .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())
    .slice(0, limit);
}
