-- Initial schema for promisepd marketing site.
--
-- Two tables back the public-facing forms:
--   * contact_submissions      — every "Get in touch" form post.
--   * newsletter_subscriptions — every newsletter sign-up (email-unique).
--
-- snake_case is used throughout to match Postgres convention and the
-- existing admin.promisepd.com schema the previous developer built,
-- so future joins / data migrations stay friction-free.
--
-- Run via the Supabase CLI:
--     supabase db push
-- …or paste this whole file into the Supabase SQL Editor for a quick
-- one-shot apply against a fresh project.

-- ============================================================
-- 1. contact_submissions
-- ============================================================
create table if not exists public.contact_submissions (
  id          uuid                primary key default gen_random_uuid(),
  name        text                not null,
  email       text                not null,
  phone       text,
  interest    text,
  message     text                not null,
  -- Free-text marker so we can tell where a lead came from once we
  -- start running ads or syndicating the form to other surfaces.
  source      text                default 'website',
  created_at  timestamptz         not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_email_idx
  on public.contact_submissions (email);

comment on table public.contact_submissions is
  'Public contact-form submissions from the marketing site.';

-- ============================================================
-- 2. newsletter_subscriptions
-- ============================================================
create table if not exists public.newsletter_subscriptions (
  id          uuid                primary key default gen_random_uuid(),
  email       text                not null unique,
  source      text                default 'website',
  created_at  timestamptz         not null default now()
);

create index if not exists newsletter_subscriptions_created_at_idx
  on public.newsletter_subscriptions (created_at desc);

comment on table public.newsletter_subscriptions is
  'Email-only newsletter sign-ups. UNIQUE(email) prevents duplicates.';

-- ============================================================
-- 3. Row Level Security
-- ============================================================
-- Both tables are RLS-enabled.  Reads + writes go ONLY through the
-- service-role key (used by Server Actions in src/app/actions.ts).
-- The anon key cannot see or insert anything.  This keeps PII off
-- the browser even if someone reads the JS bundle.

alter table public.contact_submissions      enable row level security;
alter table public.newsletter_subscriptions enable row level security;

-- Drop-and-recreate so re-running the migration is idempotent.
drop policy if exists "service role full access — contact"
  on public.contact_submissions;
drop policy if exists "service role full access — newsletter"
  on public.newsletter_subscriptions;

create policy "service role full access — contact"
  on public.contact_submissions
  for all
  to service_role
  using (true)
  with check (true);

create policy "service role full access — newsletter"
  on public.newsletter_subscriptions
  for all
  to service_role
  using (true)
  with check (true);
