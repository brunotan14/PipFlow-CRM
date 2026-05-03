import { type DealStage } from "@/types/database";
import { MOCK_OWNERS, MOCK_LEADS } from "@/lib/mock/leads";

export interface Deal {
  id: string;
  title: string;
  value: number | null;
  stage: DealStage;
  lead_id: string | null;
  owner: { id: string; name: string; initials: string };
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export const MOCK_DEALS: Deal[] = [
  {
    id: "d1",
    title: "Implementação PipeFlow Pro — Tech Solutions",
    value: 4800,
    stage: "new_lead",
    lead_id: "l1",
    owner: MOCK_OWNERS[0]!,
    due_date: "2026-05-30",
    created_at: "2026-04-28T10:00:00Z",
    updated_at: "2026-04-28T10:00:00Z",
  },
  {
    id: "d2",
    title: "Licença Anual — Grupo Mercantil",
    value: 2940,
    stage: "new_lead",
    lead_id: "l2",
    owner: MOCK_OWNERS[1]!,
    due_date: "2026-06-10",
    created_at: "2026-04-29T09:00:00Z",
    updated_at: "2026-04-29T09:00:00Z",
  },
  {
    id: "d3",
    title: "Plano Pro Mensal — Inovare Digital",
    value: 490,
    stage: "new_lead",
    lead_id: "l3",
    owner: MOCK_OWNERS[0]!,
    due_date: null,
    created_at: "2026-04-30T14:00:00Z",
    updated_at: "2026-04-30T14:00:00Z",
  },
  {
    id: "d4",
    title: "Contrato Trimestral — FastLog",
    value: 1470,
    stage: "contacted",
    lead_id: "l5",
    owner: MOCK_OWNERS[1]!,
    due_date: "2026-05-15",
    created_at: "2026-04-20T11:00:00Z",
    updated_at: "2026-04-25T16:00:00Z",
  },
  {
    id: "d5",
    title: "Integração API — MediaSphere",
    value: 3200,
    stage: "contacted",
    lead_id: "l6",
    owner: MOCK_OWNERS[0]!,
    due_date: "2026-05-20",
    created_at: "2026-04-18T09:30:00Z",
    updated_at: "2026-04-26T10:00:00Z",
  },
  {
    id: "d6",
    title: "Onboarding Equipe — Nexo CRM",
    value: 1200,
    stage: "contacted",
    lead_id: "l7",
    owner: MOCK_OWNERS[2]!,
    due_date: "2026-05-08",
    created_at: "2026-04-22T14:00:00Z",
    updated_at: "2026-04-27T11:00:00Z",
  },
  {
    id: "d7",
    title: "Proposta Enterprise — SoftLine Sistemas",
    value: 9600,
    stage: "proposal_sent",
    lead_id: "l9",
    owner: MOCK_OWNERS[0]!,
    due_date: "2026-05-12",
    created_at: "2026-04-15T10:00:00Z",
    updated_at: "2026-04-23T11:15:00Z",
  },
  {
    id: "d8",
    title: "Plano Pro Anual — ARQ Design",
    value: 5880,
    stage: "proposal_sent",
    lead_id: "l11",
    owner: MOCK_OWNERS[1]!,
    due_date: "2026-05-05",
    created_at: "2026-04-16T08:30:00Z",
    updated_at: "2026-04-24T09:00:00Z",
  },
  {
    id: "d9",
    title: "Demo + Proposta — Rede Varejo",
    value: 7350,
    stage: "proposal_sent",
    lead_id: "l12",
    owner: MOCK_OWNERS[0]!,
    due_date: "2026-05-18",
    created_at: "2026-04-20T11:45:00Z",
    updated_at: "2026-04-25T14:00:00Z",
  },
  {
    id: "d10",
    title: "Revisão Contratual — Global Finance",
    value: 2450,
    stage: "negotiation",
    lead_id: "l8",
    owner: MOCK_OWNERS[1]!,
    due_date: "2026-05-03",
    created_at: "2026-04-10T09:00:00Z",
    updated_at: "2026-04-28T15:00:00Z",
  },
  {
    id: "d11",
    title: "Expansão de Licenças — Tech Solutions",
    value: 14400,
    stage: "negotiation",
    lead_id: "l1",
    owner: MOCK_OWNERS[0]!,
    due_date: "2026-05-07",
    created_at: "2026-04-08T10:00:00Z",
    updated_at: "2026-04-29T09:30:00Z",
  },
  {
    id: "d12",
    title: "Contrato Anual — Construtora Alpha",
    value: 11760,
    stage: "closed_won",
    lead_id: "l4",
    owner: MOCK_OWNERS[2]!,
    due_date: null,
    created_at: "2026-03-15T08:30:00Z",
    updated_at: "2026-04-22T09:00:00Z",
  },
  {
    id: "d13",
    title: "Plano Pro Anual — FoodTech Brasil",
    value: 5880,
    stage: "closed_won",
    lead_id: "l10",
    owner: MOCK_OWNERS[2]!,
    due_date: null,
    created_at: "2026-03-20T15:00:00Z",
    updated_at: "2026-04-24T08:30:00Z",
  },
  {
    id: "d14",
    title: "Integração ERP — FastLog",
    value: 6500,
    stage: "closed_won",
    lead_id: "l5",
    owner: MOCK_OWNERS[1]!,
    due_date: null,
    created_at: "2026-03-28T10:00:00Z",
    updated_at: "2026-04-18T14:00:00Z",
  },
  {
    id: "d15",
    title: "Proposta Recusada — Patrícia Almeida",
    value: 3920,
    stage: "closed_lost",
    lead_id: "l9",
    owner: MOCK_OWNERS[0]!,
    due_date: null,
    created_at: "2026-04-02T09:00:00Z",
    updated_at: "2026-04-14T16:00:00Z",
  },
  {
    id: "d16",
    title: "Budget Insuficiente — Camila Rocha",
    value: 2940,
    stage: "closed_lost",
    lead_id: "l7",
    owner: MOCK_OWNERS[2]!,
    due_date: null,
    created_at: "2026-04-05T11:00:00Z",
    updated_at: "2026-04-17T10:00:00Z",
  },
];

export const STAGE_CONFIG: Record<
  DealStage,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    badgeBg: string;
    shadowColor: string;
  }
> = {
  new_lead: {
    label: "Novo Lead",
    color: "text-blue-400",
    bgColor: "bg-blue-500",
    borderColor: "border-blue-500",
    badgeBg: "bg-blue-950 text-blue-300 border-blue-900",
    shadowColor: "rgba(59,130,246,0.2)",
  },
  contacted: {
    label: "Contato Realizado",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500",
    borderColor: "border-cyan-500",
    badgeBg: "bg-cyan-950 text-cyan-300 border-cyan-900",
    shadowColor: "rgba(6,182,212,0.2)",
  },
  proposal_sent: {
    label: "Proposta Enviada",
    color: "text-amber-400",
    bgColor: "bg-amber-500",
    borderColor: "border-amber-500",
    badgeBg: "bg-amber-950 text-amber-300 border-amber-900",
    shadowColor: "rgba(245,158,11,0.2)",
  },
  negotiation: {
    label: "Negociação",
    color: "text-orange-400",
    bgColor: "bg-orange-500",
    borderColor: "border-orange-500",
    badgeBg: "bg-orange-950 text-orange-300 border-orange-900",
    shadowColor: "rgba(249,115,22,0.2)",
  },
  closed_won: {
    label: "Fechado Ganho",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500",
    borderColor: "border-emerald-500",
    badgeBg: "bg-emerald-950 text-emerald-300 border-emerald-900",
    shadowColor: "rgba(16,185,129,0.2)",
  },
  closed_lost: {
    label: "Fechado Perdido",
    color: "text-red-400",
    bgColor: "bg-red-500",
    borderColor: "border-red-500",
    badgeBg: "bg-red-950 text-red-300 border-red-900",
    shadowColor: "rgba(239,68,68,0.2)",
  },
};

export const STAGES_ORDER: DealStage[] = [
  "new_lead",
  "contacted",
  "proposal_sent",
  "negotiation",
  "closed_won",
  "closed_lost",
];

export function formatCurrency(value: number | null): string {
  if (value === null) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function getDealLead(leadId: string | null) {
  if (!leadId) return null;
  return MOCK_LEADS.find((l) => l.id === leadId) ?? null;
}

export function getDueDateStatus(dueDateStr: string | null): "overdue" | "soon" | "ok" | "none" {
  if (!dueDateStr) return "none";
  const due = new Date(dueDateStr);
  const now = new Date();
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return "overdue";
  if (diffDays <= 3) return "soon";
  return "ok";
}

export function formatDueDate(dueDateStr: string): string {
  return new Date(dueDateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}
