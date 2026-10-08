create table if not exists public.supporter_registrations (
  id uuid primary key,
  created_at timestamptz not null default now(),
  surname text not null check (char_length(surname) between 1 and 80),
  first_name text not null check (char_length(first_name) between 1 and 80),
  email text,
  phone text not null,
  address text,
  local_government text not null,
  consent_version text not null
);

alter table public.supporter_registrations enable row level security;
revoke all on public.supporter_registrations from anon, authenticated;
grant select, insert on public.supporter_registrations to service_role;
