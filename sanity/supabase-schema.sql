-- Supabase schema for Studio A by Nancy leads + drafts.
-- Run in the Supabase SQL editor when wiring the backend.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'direct',
  intent text not null default 'inquire',
  variant text not null default 'full',
  project_type text not null,
  scope text[] not null,
  aesthetic text not null,
  investment text not null,
  timeline text not null,
  name text not null,
  email text not null,
  phone text,
  location text,
  details text,
  notes text
);

create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_email_idx on public.leads(email);

-- Drafts (resume tokens). Optional v2.
create table if not exists public.intake_drafts (
  token uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  draft jsonb not null,
  email text,
  abandoned_email_sent boolean default false
);

create index if not exists intake_drafts_email_idx on public.intake_drafts(email);

-- Row-level security: write via service role only.
alter table public.leads enable row level security;
alter table public.intake_drafts enable row level security;
