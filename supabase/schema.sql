-- Run this once in the Supabase SQL editor.

-- One row per user. `plan` is groundwork for paid access later.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  plan text not null default 'free' check (plan in ('free', 'paid')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users read own profile"
  on public.profiles for select
  using ((select auth.uid()) = id);

-- Create the profile automatically on sign-up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Quiz attempts.
create table if not exists public.quiz_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  topic text not null,
  score int not null check (score >= 0),
  total int not null check (total > 0 and score <= total),
  created_at timestamptz not null default now()
);

create index if not exists quiz_attempts_user_idx
  on public.quiz_attempts (user_id, created_at desc);

alter table public.quiz_attempts enable row level security;

create policy "Users read own attempts"
  on public.quiz_attempts for select
  using ((select auth.uid()) = user_id);

create policy "Users insert own attempts"
  on public.quiz_attempts for insert
  with check ((select auth.uid()) = user_id);
