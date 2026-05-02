-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================

create type plan_type as enum ('free', 'pro');
create type member_role as enum ('admin', 'member');
create type lead_status as enum ('new', 'contacted', 'qualified', 'unqualified', 'customer');
create type deal_stage as enum (
  'new_lead',
  'contacted',
  'proposal_sent',
  'negotiation',
  'closed_won',
  'closed_lost'
);
create type activity_type as enum ('call', 'email', 'meeting', 'note');

-- ============================================================
-- WORKSPACES
-- ============================================================

create table workspaces (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  plan plan_type not null default 'free',
  stripe_customer_id text,
  stripe_subscription_id text,
  onboarding_done boolean not null default false,
  created_at timestamptz not null default now()
);

alter table workspaces enable row level security;

-- ============================================================
-- WORKSPACE MEMBERS
-- ============================================================

create table workspace_members (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role member_role not null default 'member',
  created_at timestamptz not null default now(),
  unique(workspace_id, user_id)
);

alter table workspace_members enable row level security;

-- ============================================================
-- LEADS
-- ============================================================

create table leads (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  company text,
  position text,
  status lead_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table leads enable row level security;

-- ============================================================
-- DEALS
-- ============================================================

create table deals (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  lead_id uuid references leads(id) on delete set null,
  title text not null,
  value numeric(12, 2),
  stage deal_stage not null default 'new_lead',
  owner_id uuid references auth.users(id) on delete set null,
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table deals enable row level security;

-- ============================================================
-- ACTIVITIES
-- ============================================================

create table activities (
  id uuid primary key default uuid_generate_v4(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  lead_id uuid not null references leads(id) on delete cascade,
  type activity_type not null,
  description text not null,
  author_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table activities enable row level security;

-- ============================================================
-- RLS POLICIES
-- Helper: verifica se o usuário é membro do workspace
-- ============================================================

create or replace function is_workspace_member(ws_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from workspace_members
    where workspace_id = ws_id
      and user_id = auth.uid()
  );
$$;

-- Workspaces
create policy "members can view workspace"
  on workspaces for select
  using (is_workspace_member(id));

create policy "admins can update workspace"
  on workspaces for update
  using (
    exists (
      select 1 from workspace_members
      where workspace_id = workspaces.id
        and user_id = auth.uid()
        and role = 'admin'
    )
  );

-- Workspace members
create policy "members can view workspace members"
  on workspace_members for select
  using (is_workspace_member(workspace_id));

create policy "admins can manage workspace members"
  on workspace_members for all
  using (
    exists (
      select 1 from workspace_members wm
      where wm.workspace_id = workspace_members.workspace_id
        and wm.user_id = auth.uid()
        and wm.role = 'admin'
    )
  );

-- Leads
create policy "members can manage leads"
  on leads for all
  using (is_workspace_member(workspace_id));

-- Deals
create policy "members can manage deals"
  on deals for all
  using (is_workspace_member(workspace_id));

-- Activities
create policy "members can manage activities"
  on activities for all
  using (is_workspace_member(workspace_id));

-- ============================================================
-- UPDATED_AT trigger
-- ============================================================

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_updated_at
  before update on leads
  for each row execute function set_updated_at();

create trigger deals_updated_at
  before update on deals
  for each row execute function set_updated_at();
