import { type LeadStatus, type ActivityType } from "@/types/database";

export interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  position: string | null;
  status: LeadStatus;
  owner: { id: string; name: string; initials: string };
  created_at: string;
  updated_at: string;
}

export interface Activity {
  id: string;
  lead_id: string;
  type: ActivityType;
  description: string;
  author: { name: string; initials: string };
  created_at: string;
}

export const MOCK_OWNERS = [
  { id: "u1", name: "Bruno Nathan", initials: "BN" },
  { id: "u2", name: "Carla Souza", initials: "CS" },
  { id: "u3", name: "Rafael Lima", initials: "RL" },
];

export const MOCK_LEADS: Lead[] = [
  {
    id: "l1",
    name: "Fernanda Oliveira",
    email: "fernanda@techsolutions.com.br",
    phone: "(11) 98765-4321",
    company: "Tech Solutions Ltda",
    position: "Diretora de Operações",
    status: "qualified",
    owner: MOCK_OWNERS[0]!,
    created_at: "2026-04-01T10:00:00Z",
    updated_at: "2026-04-20T14:30:00Z",
  },
  {
    id: "l2",
    name: "Ricardo Mendes",
    email: "ricardo@grupomercantil.com",
    phone: "(21) 99234-5678",
    company: "Grupo Mercantil S.A.",
    position: "Gerente Comercial",
    status: "contacted",
    owner: MOCK_OWNERS[1]!,
    created_at: "2026-04-03T09:15:00Z",
    updated_at: "2026-04-18T11:00:00Z",
  },
  {
    id: "l3",
    name: "Juliana Costa",
    email: "juliana.costa@inovare.io",
    phone: "(31) 97654-3210",
    company: "Inovare Digital",
    position: "CEO",
    status: "new",
    owner: MOCK_OWNERS[0]!,
    created_at: "2026-04-05T16:45:00Z",
    updated_at: "2026-04-05T16:45:00Z",
  },
  {
    id: "l4",
    name: "Eduardo Pires",
    email: "eduardo@construtora-alpha.com",
    phone: "(41) 98123-4567",
    company: "Construtora Alpha",
    position: "Sócio-Diretor",
    status: "customer",
    owner: MOCK_OWNERS[2]!,
    created_at: "2026-03-15T08:30:00Z",
    updated_at: "2026-04-22T09:00:00Z",
  },
  {
    id: "l5",
    name: "Mariana Santos",
    email: "mariana@fastlog.com.br",
    phone: "(51) 99876-5432",
    company: "FastLog Transportes",
    position: "Coordenadora de Vendas",
    status: "qualified",
    owner: MOCK_OWNERS[1]!,
    created_at: "2026-04-08T13:00:00Z",
    updated_at: "2026-04-21T15:45:00Z",
  },
  {
    id: "l6",
    name: "Thiago Barbosa",
    email: "thiago@mediasphere.com.br",
    phone: null,
    company: "MediaSphere Comunicação",
    position: "Diretor Criativo",
    status: "unqualified",
    owner: MOCK_OWNERS[0]!,
    created_at: "2026-04-10T11:20:00Z",
    updated_at: "2026-04-15T10:00:00Z",
  },
  {
    id: "l7",
    name: "Camila Rocha",
    email: "camila@nexocrm.com",
    phone: "(11) 97345-6789",
    company: "Nexo CRM",
    position: "Head de Marketing",
    status: "contacted",
    owner: MOCK_OWNERS[2]!,
    created_at: "2026-04-12T14:30:00Z",
    updated_at: "2026-04-19T16:00:00Z",
  },
  {
    id: "l8",
    name: "André Vieira",
    email: "andre.vieira@globalfinance.com",
    phone: "(61) 98765-1234",
    company: "Global Finance",
    position: "Analista Sênior",
    status: "new",
    owner: MOCK_OWNERS[1]!,
    created_at: "2026-04-14T09:00:00Z",
    updated_at: "2026-04-14T09:00:00Z",
  },
  {
    id: "l9",
    name: "Patrícia Almeida",
    email: "patricia@softline.com.br",
    phone: "(85) 99654-3210",
    company: "SoftLine Sistemas",
    position: "Gerente de TI",
    status: "qualified",
    owner: MOCK_OWNERS[0]!,
    created_at: "2026-04-16T10:30:00Z",
    updated_at: "2026-04-23T11:15:00Z",
  },
  {
    id: "l10",
    name: "Lucas Fernandes",
    email: "lucas@foodtech.com.br",
    phone: "(71) 98234-5678",
    company: "FoodTech Brasil",
    position: "Fundador",
    status: "customer",
    owner: MOCK_OWNERS[2]!,
    created_at: "2026-03-20T15:00:00Z",
    updated_at: "2026-04-24T08:30:00Z",
  },
  {
    id: "l11",
    name: "Isabela Carvalho",
    email: "isabela@arqdesign.com",
    phone: "(19) 97123-4567",
    company: "ARQ Design Studio",
    position: "Proprietária",
    status: "new",
    owner: MOCK_OWNERS[1]!,
    created_at: "2026-04-18T08:00:00Z",
    updated_at: "2026-04-18T08:00:00Z",
  },
  {
    id: "l12",
    name: "Gustavo Nunes",
    email: "gustavo@redevarejo.com.br",
    phone: "(62) 98876-4321",
    company: "Rede Varejo Nacional",
    position: "Comprador Sênior",
    status: "contacted",
    owner: MOCK_OWNERS[0]!,
    created_at: "2026-04-20T11:45:00Z",
    updated_at: "2026-04-25T14:00:00Z",
  },
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "a1",
    lead_id: "l1",
    type: "call",
    description: "Ligação de apresentação do produto. Cliente demonstrou interesse na plano Pro e pediu proposta formal.",
    author: MOCK_OWNERS[0]!,
    created_at: "2026-04-20T14:30:00Z",
  },
  {
    id: "a2",
    lead_id: "l1",
    type: "email",
    description: "Enviei proposta comercial com detalhamento de preços e features. Aguardando retorno.",
    author: MOCK_OWNERS[0]!,
    created_at: "2026-04-18T10:00:00Z",
  },
  {
    id: "a3",
    lead_id: "l1",
    type: "meeting",
    description: "Reunião de descoberta via Google Meet. Mapeamos as dores do processo comercial atual da empresa.",
    author: MOCK_OWNERS[0]!,
    created_at: "2026-04-15T15:00:00Z",
  },
  {
    id: "a4",
    lead_id: "l1",
    type: "note",
    description: "Cliente tem equipe de 5 vendedores. Budget aprovado pelo board. Decisão até final do mês.",
    author: MOCK_OWNERS[0]!,
    created_at: "2026-04-10T09:00:00Z",
  },
  {
    id: "a5",
    lead_id: "l2",
    type: "call",
    description: "Primeiro contato. Ricardo estava em reunião, retornará amanhã.",
    author: MOCK_OWNERS[1]!,
    created_at: "2026-04-18T11:00:00Z",
  },
  {
    id: "a6",
    lead_id: "l2",
    type: "email",
    description: "Enviei e-mail de introdução com case de sucesso de empresa do mesmo segmento.",
    author: MOCK_OWNERS[1]!,
    created_at: "2026-04-03T09:15:00Z",
  },
  {
    id: "a7",
    lead_id: "l4",
    type: "meeting",
    description: "Onboarding concluído com sucesso. Eduardo está satisfeito com a plataforma.",
    author: MOCK_OWNERS[2]!,
    created_at: "2026-04-22T09:00:00Z",
  },
  {
    id: "a8",
    lead_id: "l5",
    type: "call",
    description: "Mariana confirmou que avançará para demo técnica na semana que vem.",
    author: MOCK_OWNERS[1]!,
    created_at: "2026-04-21T15:45:00Z",
  },
  {
    id: "a9",
    lead_id: "l9",
    type: "email",
    description: "Proposta personalizada enviada com plano de migração do sistema atual.",
    author: MOCK_OWNERS[0]!,
    created_at: "2026-04-23T11:15:00Z",
  },
  {
    id: "a10",
    lead_id: "l12",
    type: "call",
    description: "Follow-up após envio de material. Gustavo quer agendar demo com o time.",
    author: MOCK_OWNERS[0]!,
    created_at: "2026-04-25T14:00:00Z",
  },
];

export const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; className: string }
> = {
  new: {
    label: "Novo",
    className: "bg-zinc-800 text-zinc-300 border-zinc-700",
  },
  contacted: {
    label: "Contatado",
    className: "bg-amber-950 text-amber-400 border-amber-900",
  },
  qualified: {
    label: "Qualificado",
    className: "bg-indigo-950 text-indigo-400 border-indigo-900",
  },
  unqualified: {
    label: "Desqualificado",
    className: "bg-red-950 text-red-400 border-red-900",
  },
  customer: {
    label: "Cliente",
    className: "bg-emerald-950 text-emerald-400 border-emerald-900",
  },
};

export const ACTIVITY_CONFIG: Record<
  ActivityType,
  { label: string; icon: string }
> = {
  call: { label: "Ligação", icon: "phone" },
  email: { label: "E-mail", icon: "mail" },
  meeting: { label: "Reunião", icon: "calendar" },
  note: { label: "Nota", icon: "file-text" },
};

export function getLeadActivities(leadId: string): Activity[] {
  return MOCK_ACTIVITIES.filter((a) => a.lead_id === leadId).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Ontem";
  if (diffDays < 7) return `${diffDays} dias atrás`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} sem. atrás`;
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function formatFullDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
