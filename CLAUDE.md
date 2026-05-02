# PipeFlow CRM — Briefing do Projeto

> Documento completo de requisitos: [docs/PRD.md](docs/PRD.md)

---

## O que é

PipeFlow CRM é uma plataforma web SaaS de gestão de clientes e vendas para pequenas e médias empresas, freelancers e times de vendas. Resolve a falta de organização no processo comercial com um pipeline visual Kanban, gestão completa de leads, histórico de interações e modelo freemium acessível — alternativa direta ao HubSpot e Pipedrive para quem está começando.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript 5 (strict) |
| UI | React 18 + Tailwind CSS + shadcn/ui |
| Banco + Auth | Supabase (PostgreSQL + RLS + Auth) |
| Pagamento | Stripe (Checkout + Webhooks) |
| E-mail | Resend |
| Drag-and-drop | @dnd-kit |
| Gráficos | Recharts |
| Deploy | Vercel (app) + Supabase (banco) |

---

## Estrutura de Pastas

```
src/
  app/
    (auth)/              # /login, /register, /forgot-password
    (app)/               # área autenticada (requer sessão)
      dashboard/
      leads/
      pipeline/
      settings/
    api/
      webhooks/
        stripe/          # route.ts — handler de eventos Stripe
  components/
    ui/                  # componentes base do shadcn/ui
    leads/
    pipeline/
    dashboard/
  lib/
    supabase/
      client.ts          # client-side (real-time apenas)
      server.ts          # server-side (SSR, Server Actions)
    stripe/
    resend/
  types/                 # tipos globais e schemas Zod
docs/
  PRD.md
supabase/
  migrations/            # migrations versionadas
```

---

## Convenções de Código

- **TypeScript estrito** — proibido `any`
- **Server Components por padrão** — usar `"use client"` só para interatividade ou hooks
- **Mutações via Server Actions** — não criar rotas REST para operações internas
- **Validação com Zod** — toda entrada de usuário e resposta de API externa
- **Arquivos**: kebab-case (`lead-card.tsx`, `pipeline-column.tsx`)
- **Componentes**: PascalCase (`LeadCard`, `PipelineColumn`)
- **Sem segredos no cliente** — chaves de API exclusivamente em variáveis server-side

---

## Identidade Visual

Referências: HubSpot CRM (ecossistema), Pipedrive (UX do pipeline).

**Princípios:**
- Interface limpa, densa de informação sem parecer carregada
- Foco em ação: o que fazer agora é sempre visível
- Pipeline Kanban é o elemento central da experiência

**Paleta sugerida:**
- Primária: azul-índigo (`#4F46E5` / `indigo-600`) — ação, botões, links
- Sucesso/Ganho: verde (`#16A34A` / `green-600`)
- Perda/Alerta: vermelho (`#DC2626` / `red-600`)
- Neutro: cinza slate para backgrounds e bordas
- Superfície: branco com sidebar em cinza muito claro (`slate-50`)

**Componentes-chave:**
- Sidebar fixa com dropdown de workspace e avatar do usuário
- Cards Kanban compactos com chip de valor em R$, avatar do responsável e badge de prazo
- Timeline de atividades com ícone por tipo (ligação, e-mail, reunião, nota)
- Dashboard com cards de métrica grandes e gráfico de funil lateral

---

## Modelo de Dados (tabelas principais)

```
workspaces        — id, name, plan, stripe_customer_id, stripe_subscription_id
workspace_members — workspace_id, user_id, role (admin | member)
leads             — id, workspace_id, name, email, phone, company, position, status
deals             — id, workspace_id, lead_id, title, value, stage, owner_id, due_date
activities        — id, workspace_id, lead_id, type, description, author_id, created_at
```

RLS ativo em todas as tabelas — isolamento por `workspace_id`.

---

## Planos e Limites

| Recurso | Free | Pro |
|---|---|---|
| Colaboradores | até 2 | ilimitado |
| Leads | até 50 | ilimitado |
| Preço | R$ 0 | R$ 49/mês |

Limites verificados no servidor antes de criar leads/membros. Status do plano persistido via webhook Stripe → tabela `workspaces`.

---

## Ordem de Desenvolvimento (Milestones)

1. Setup do projeto (Next.js + Supabase + shadcn/ui)
2. Autenticação (login, registro, sessão via middleware)
3. Workspaces + convite de colaboradores (Resend)
4. Gestão de Leads (CRUD + busca + filtros)
5. Pipeline Kanban (drag-and-drop + persistência)
6. Histórico de Atividades (timeline por lead)
7. Dashboard de Métricas (cards + gráfico Recharts)
8. Monetização Stripe (checkout + webhook + portal)
9. Landing Page pública
10. Onboarding do usuário

---

## Variáveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=
```
