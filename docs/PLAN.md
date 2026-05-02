# PipeFlow CRM — Plano de Execução

> Estratégia: interface primeiro, backend depois. Cada milestone entrega uma fatia vertical funcional e visualmente completa antes de conectar ao banco.

---

## Identidade Visual — Dark Theme

O PipeFlow CRM adota dark mode como tema padrão. A paleta prioriza contraste acessível, hierarquia visual clara e destaque para ações e dados críticos de vendas.

**Backgrounds (camadas):**

| Camada | Token Tailwind | Hex |
|---|---|---|
| Base (mais funda) | `zinc-950` | `#09090b` |
| Superfície (cards, modais) | `zinc-900` | `#18181b` |
| Elevado (dropdowns, tooltips) | `zinc-800` | `#27272a` |
| Borda | `zinc-700` | `#3f3f46` |

**Tipografia:**

| Uso | Token Tailwind | Hex |
|---|---|---|
| Título / destaque | `zinc-50` | `#fafafa` |
| Corpo / label | `zinc-300` | `#d4d4d8` |
| Texto secundário | `zinc-500` | `#71717a` |
| Placeholder | `zinc-600` | `#52525b` |

**Cores funcionais:**

| Papel | Token Tailwind | Hex |
|---|---|---|
| Primária (ação, botão, link) | `indigo-500` | `#6366f1` |
| Primária hover | `indigo-400` | `#818cf8` |
| Sucesso / Fechado Ganho | `emerald-500` | `#10b981` |
| Perda / Fechado Perdido | `red-500` | `#ef4444` |
| Alerta / prazo próximo | `amber-400` | `#fbbf24` |
| Neutro / tag | `zinc-700` | `#3f3f46` |

**Aplicação por componente:**

- **Sidebar:** fundo `zinc-950`, links ativos com fundo `zinc-800` + texto `zinc-50` + borda esquerda `indigo-500`
- **Cards Kanban:** fundo `zinc-900`, borda `zinc-800`, hover eleva para `zinc-800` com sombra sutil
- **Modais e drawers:** fundo `zinc-900`, overlay `zinc-950/80` com blur
- **Inputs e selects:** fundo `zinc-800`, borda `zinc-700`, focus com anel `indigo-500`
- **Botão primário:** fundo `indigo-600`, hover `indigo-500`, texto `zinc-50`
- **Botão ghost/outline:** borda `zinc-700`, hover fundo `zinc-800`
- **Badge de valor (R$):** fundo `emerald-950`, texto `emerald-400`
- **Badge de prazo urgente:** fundo `amber-950`, texto `amber-400`

**Configuração no Tailwind (`tailwind.config.ts`):**

```ts
darkMode: 'class', // togglear via classe .dark na raiz
```

Adicionar `class="dark"` no `<html>` por padrão — dark é o tema principal, não alternativo.

---

## M0 — Setup & Infraestrutura

**Branch:** `setup/project-foundation`
**Objetivo:** Projeto rodando localmente com toda a stack configurada e estrutura de pastas no lugar.

- [x] Inicializar projeto com `create-next-app` (TypeScript, App Router, Tailwind)
- [x] Configurar `tsconfig.json` com strict mode
- [x] Instalar e inicializar shadcn/ui
- [x] Criar estrutura de pastas conforme CLAUDE.md (`app/`, `components/`, `lib/`, `types/`)
- [x] Configurar variáveis de ambiente (`.env.local` + `.env.example`)
- [ ] Conectar projeto ao Supabase (criar projeto, copiar URL e anon key)
- [x] Instalar dependências: `@supabase/ssr`, `@dnd-kit/core`, `recharts`, `resend`, `stripe`, `zod`
- [x] Configurar `lib/supabase/client.ts` e `lib/supabase/server.ts`
- [x] Configurar `middleware.ts` para proteção de rotas
- [x] Configurar ESLint + Prettier
- [x] Subir projeto no GitHub

**Commit final:** `chore: project setup with Next.js 14, Supabase, shadcn/ui and folder structure`

---

## M1 — Shell Visual da Aplicação

**Branch:** `feat/app-shell`
**Objetivo:** Layout autenticado completo com sidebar, header e navegação — sem dados reais, tudo estático.

- [ ] Criar layout base `app/(app)/layout.tsx`
- [ ] Criar componente `Sidebar` com links de navegação (Dashboard, Leads, Pipeline, Settings)
- [ ] Adicionar dropdown de workspace na sidebar (estático, com dados mockados)
- [ ] Adicionar avatar do usuário + menu de conta na sidebar
- [ ] Criar `Header` com título da página e slot para ações
- [ ] Criar páginas vazias (placeholder) para `/dashboard`, `/leads`, `/pipeline`, `/settings`
- [ ] Aplicar paleta de cores: indigo-600 primário, slate-50 sidebar, branco superfície
- [ ] Garantir responsividade básica (sidebar colapsável em mobile)
- [ ] Criar `app/(auth)/layout.tsx` com layout centralizado para telas de auth

**Commit final:** `feat: app shell with sidebar, navigation and base layout`

---

## M2 — Autenticação (UI → Backend)

**Branch:** `feat/authentication`
**Objetivo:** Fluxo completo de login, registro e recuperação de senha funcionando com Supabase Auth.

**Interface primeiro:**
- [ ] Criar página `/login` com formulário (e-mail + senha) usando shadcn/ui `Form`
- [ ] Criar página `/register` com formulário (nome, e-mail, senha)
- [ ] Criar página `/forgot-password` com formulário de e-mail
- [ ] Criar página `/reset-password` para redefinição via link
- [ ] Adicionar validação client-side com Zod + react-hook-form
- [ ] Adicionar estados de loading, erro e sucesso nos formulários

**Backend:**
- [ ] Criar Server Actions em `lib/auth/actions.ts` (signIn, signUp, signOut, resetPassword)
- [ ] Configurar callback de auth em `app/auth/callback/route.ts`
- [ ] Proteger rotas `(app)/` no `middleware.ts` — redirecionar para `/login` se sem sessão
- [ ] Redirecionar usuário autenticado para `/dashboard` após login
- [ ] Implementar logout no menu de conta da sidebar

**Commit final:** `feat: authentication with Supabase Auth, login, register and password reset`

---

## M3 — Workspaces & Colaboração (UI → Backend)

**Branch:** `feat/workspaces`
**Objetivo:** Criar e alternar entre workspaces, convidar colaboradores por e-mail com controle de papéis.

**Interface primeiro:**
- [ ] Criar modal "Criar novo workspace" (campo nome)
- [ ] Implementar dropdown de alternância de workspace na sidebar (troca visual)
- [ ] Criar página `/settings` com abas: Workspace, Membros, Plano
- [ ] Criar aba Membros com listagem de colaboradores (avatar, nome, papel, ações)
- [ ] Criar modal "Convidar colaborador" (campo e-mail + select de papel)
- [ ] Criar página pública `/invite/[token]` para aceite de convite

**Banco de dados:**
- [ ] Migration: tabelas `workspaces` e `workspace_members`
- [ ] Configurar RLS: usuário acessa apenas workspaces onde é membro
- [ ] Criar workspace automaticamente no registro do usuário

**Backend:**
- [ ] Server Actions para criar workspace, convidar membro, remover membro, alterar papel
- [ ] Integrar Resend para enviar e-mail de convite com link tokenizado
- [ ] Persistir `workspace_id` ativo em cookie de sessão
- [ ] Verificar `role` do usuário antes de ações administrativas

**Commit final:** `feat: multi-workspace with invite system and role-based access`

---

## M4 — Gestão de Leads (UI → Backend)

**Branch:** `feat/leads`
**Objetivo:** CRUD completo de leads com listagem, busca, filtros e página de detalhe.

**Interface primeiro:**
- [ ] Criar página `/leads` com tabela de leads (nome, empresa, status, responsável, data)
- [ ] Criar barra de busca e filtros (por status, responsável, data de criação)
- [ ] Criar modal/drawer "Novo Lead" com formulário completo (nome, e-mail, telefone, empresa, cargo, status)
- [ ] Criar página `/leads/[id]` com perfil do lead (dados + seção de atividades vazia)
- [ ] Adicionar menu de ações por lead (editar, excluir, ver detalhe)
- [ ] Estados vazios (empty state) para listagem sem leads
- [ ] Paginação ou scroll infinito na listagem

**Banco de dados:**
- [ ] Migration: tabela `leads` com RLS por `workspace_id`

**Backend:**
- [ ] Server Actions para criar, editar e excluir lead
- [ ] Server Component para listar leads com filtros via searchParams
- [ ] Verificar limite do plano Free (máx 50 leads) antes de criar
- [ ] Validação Zod em todos os campos do formulário

**Commit final:** `feat: leads management with CRUD, search, filters and detail page`

---

## M5 — Pipeline Kanban (UI → Backend)

**Branch:** `feat/pipeline`
**Objetivo:** Pipeline visual com drag-and-drop entre etapas e persistência de posição no banco.

**Interface primeiro:**
- [ ] Criar página `/pipeline` com layout horizontal de colunas Kanban
- [ ] Criar componente `PipelineColumn` com header (nome da etapa + contador + soma de valor)
- [ ] Criar componente `DealCard` com título, valor em R$, lead vinculado, avatar do responsável e badge de prazo
- [ ] Implementar drag-and-drop entre colunas com `@dnd-kit`
- [ ] Criar modal "Novo Negócio" (título, valor, lead vinculado, responsável, prazo, etapa)
- [ ] Criar drawer de detalhe do negócio ao clicar no card
- [ ] Indicador visual de coluna ativa durante drag
- [ ] Colunas: Novo Lead, Contato Realizado, Proposta Enviada, Negociação, Fechado Ganho, Fechado Perdido

**Banco de dados:**
- [ ] Migration: tabela `deals` com RLS por `workspace_id`

**Backend:**
- [ ] Server Actions para criar e editar negócio
- [ ] Server Action para atualizar `stage` do negócio (chamada ao soltar card)
- [ ] Carregar deals agrupados por etapa via Server Component

**Commit final:** `feat: kanban pipeline with drag-and-drop and deal management`

---

## M6 — Histórico de Atividades (UI → Backend)

**Branch:** `feat/activities`
**Objetivo:** Timeline de atividades por lead com registro de ligações, e-mails, reuniões e notas.

**Interface primeiro:**
- [ ] Adicionar seção "Atividades" na página `/leads/[id]`
- [ ] Criar componente `ActivityTimeline` com itens cronológicos
- [ ] Ícone por tipo de atividade: 📞 ligação, 📧 e-mail, 📅 reunião, 📝 nota
- [ ] Criar formulário inline "Registrar atividade" (tipo, descrição, data)
- [ ] Exibir autor e data relativa em cada item da timeline
- [ ] Estado vazio com CTA para registrar primeira atividade

**Banco de dados:**
- [ ] Migration: tabela `activities` com RLS por `workspace_id`

**Backend:**
- [ ] Server Action para criar atividade
- [ ] Carregar timeline de atividades do lead via Server Component
- [ ] Ordenação decrescente por `created_at`

**Commit final:** `feat: activity timeline with call, email, meeting and note types`

---

## M7 — Dashboard de Métricas (UI → Backend)

**Branch:** `feat/dashboard`
**Objetivo:** Dashboard com KPIs de vendas, gráfico de funil e negócios com prazo próximo.

**Interface primeiro:**
- [ ] Criar página `/dashboard` com grid de cards de métricas
- [ ] Card: Total de Leads (número + variação)
- [ ] Card: Negócios Abertos (número + valor somado)
- [ ] Card: Valor Total do Pipeline (R$ formatado)
- [ ] Card: Taxa de Conversão (% Fechado Ganho / total)
- [ ] Criar componente `FunnelChart` com Recharts (barras por etapa)
- [ ] Seção "Negócios com prazo próximo" (lista dos 5 mais urgentes do usuário logado)
- [ ] Skeleton loading para todos os cards

**Backend:**
- [ ] Queries agregadas via Supabase para cada KPI
- [ ] Filtrar dados por `workspace_id` do usuário ativo
- [ ] Carregar métricas em Server Component com Suspense por seção

**Commit final:** `feat: sales dashboard with KPIs, funnel chart and upcoming deals`

---

## M8 — Monetização com Stripe (UI → Backend)

**Branch:** `feat/stripe-billing`
**Objetivo:** Planos Free e Pro com checkout, webhook e portal de assinatura funcionando.

**Interface primeiro:**
- [ ] Criar aba "Plano" em `/settings` com card do plano atual
- [ ] Exibir limite de uso (leads usados / total, colaboradores usados / total)
- [ ] Botão "Fazer upgrade para Pro" para plano Free
- [ ] Botão "Gerenciar assinatura" para plano Pro (abre Customer Portal)
- [ ] Banner de upgrade ao atingir limite do plano Free

**Backend:**
- [ ] Configurar produtos e preços no Stripe Dashboard
- [ ] Criar `lib/stripe/index.ts` com cliente Stripe
- [ ] Server Action para criar Stripe Checkout Session
- [ ] Criar `app/api/webhooks/stripe/route.ts` para processar eventos:
  - `checkout.session.completed` → ativar plano Pro
  - `customer.subscription.deleted` → reverter para Free
- [ ] Atualizar `workspaces.plan` via webhook
- [ ] Server Action para criar Customer Portal Session
- [ ] Verificar limite de plano antes de criar leads e membros

**Commit final:** `feat: Stripe billing with checkout, webhooks and customer portal`

---

## M9 — Landing Page

**Branch:** `feat/landing-page`
**Objetivo:** Página pública de apresentação do PipeFlow CRM otimizada para conversão.

- [ ] Criar `app/page.tsx` como landing page pública
- [ ] Seção Hero: headline, subtítulo, CTA "Começar grátis" e screenshot do pipeline
- [ ] Seção Funcionalidades: grid com ícones e descrições dos 6 principais recursos
- [ ] Seção Pipeline: GIF ou imagem animada do Kanban em uso
- [ ] Seção Planos: tabela comparativa Free vs Pro com botões de CTA
- [ ] Seção Depoimentos (placeholder com dados fictícios)
- [ ] Footer com links (Termos, Privacidade, Contato)
- [ ] Navbar com logo + botões "Entrar" e "Começar grátis"
- [ ] Responsiva para mobile e tablet
- [ ] Metatags e Open Graph para SEO básico

**Commit final:** `feat: public landing page with hero, features, pricing and footer`

---

## M10 — Onboarding do Usuário

**Branch:** `feat/onboarding`
**Objetivo:** Fluxo de boas-vindas guiado que leva o usuário a criar workspace e primeiro lead.

- [ ] Criar fluxo `/onboarding` com steps (stepper visual)
  - Step 1: Nome do workspace
  - Step 2: Convidar colaboradores (opcional, pulável)
  - Step 3: Criar primeiro lead (opcional, pulável)
- [ ] Redirecionar novo usuário para `/onboarding` após registro
- [ ] Marcar onboarding como completo em `workspaces.onboarding_done`
- [ ] Criar checklist de "Primeiros passos" no dashboard (colapsável após completar tudo)
- [ ] Tooltip de boas-vindas no pipeline vazio com CTA para criar primeiro negócio

**Commit final:** `feat: user onboarding flow with workspace setup and first lead creation`

---

## M11 — Deploy & Produção

**Branch:** `feat/production-deploy`
**Objetivo:** Aplicação em produção na Vercel com Supabase configurado, domínio e variáveis de ambiente.

- [ ] Criar projeto na Vercel e conectar repositório GitHub
- [ ] Configurar variáveis de ambiente na Vercel (todas do `.env.example`)
- [ ] Configurar domínio customizado (se disponível)
- [ ] Rodar todas as migrations no banco de produção do Supabase
- [ ] Ativar RLS e verificar policies em produção
- [ ] Configurar webhook do Stripe apontando para URL de produção
- [ ] Configurar Resend com domínio de e-mail verificado
- [ ] Testar fluxo completo em produção: registro → workspace → lead → pipeline → upgrade
- [ ] Configurar `NEXT_PUBLIC_APP_URL` com URL de produção
- [ ] Revisão final de segurança (variáveis expostas, RLS, validações)

**Commit final:** `chore: production deployment configuration and environment setup`

---

## Resumo dos Milestones

| # | Branch | Entrega |
|---|---|---|
| M0 | `setup/project-foundation` | Stack configurada, projeto no GitHub |
| M1 | `feat/app-shell` | Layout com sidebar e navegação |
| M2 | `feat/authentication` | Login, registro, sessão |
| M3 | `feat/workspaces` | Multi-empresa, convites, papéis |
| M4 | `feat/leads` | CRUD de leads, busca, filtros |
| M5 | `feat/pipeline` | Kanban com drag-and-drop |
| M6 | `feat/activities` | Timeline de atividades por lead |
| M7 | `feat/dashboard` | KPIs, funil e negócios urgentes |
| M8 | `feat/stripe-billing` | Planos, checkout e webhooks |
| M9 | `feat/landing-page` | Página pública de apresentação |
| M10 | `feat/onboarding` | Fluxo de boas-vindas guiado |
| M11 | `feat/production-deploy` | Deploy em produção na Vercel |
