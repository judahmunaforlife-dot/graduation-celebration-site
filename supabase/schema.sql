-- ============================================================
-- Graduation celebration site — database setup
-- Run this in the Supabase SQL editor (Dashboard > SQL Editor)
-- for EACH instance's dedicated Supabase project.
-- ============================================================

-- Moments / wishes wall
create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'A well-wisher',
  message text not null check (char_length(message) between 1 and 500),
  hearts integer not null default 0 check (hearts >= 0),
  status text not null default 'visible'
    check (status in ('visible', 'hidden')),
  created_at timestamptz not null default now()
);

-- Blessings wall
create table if not exists public.blessings (
  id uuid primary key default gen_random_uuid(),
  label text not null check (char_length(label) between 1 and 40),
  hearts integer not null default 0 check (hearts >= 0),
  status text not null default 'visible'
    check (status in ('visible', 'hidden')),
  created_at timestamptz not null default now()
);

-- Event RSVPs
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 60),
  attending boolean not null,
  guests integer not null default 0 check (guests between 0 and 6),
  created_at timestamptz not null default now(),
  check ((attending and guests between 1 and 6) or (not attending and guests = 0))
);

-- Upgrade path: add the moderation column on instances created before it.
alter table public.wishes add column if not exists status text
  not null default 'visible' check (status in ('visible', 'hidden'));
alter table public.blessings add column if not exists status text
  not null default 'visible' check (status in ('visible', 'hidden'));

-- Row Level Security: everyone can read visible rows and write, since this is
-- a public guestbook. No auth required. Moderation happens by flipping a
-- row's status to 'hidden' in the SQL or Table editor (no code change needed).
alter table public.wishes enable row level security;
alter table public.blessings enable row level security;
alter table public.rsvps enable row level security;

drop policy if exists "public read wishes" on public.wishes;
drop policy if exists "public insert wishes" on public.wishes;
drop policy if exists "public read blessings" on public.blessings;
drop policy if exists "public insert blessings" on public.blessings;
drop policy if exists "public read rsvps" on public.rsvps;
drop policy if exists "public insert rsvps" on public.rsvps;

create policy "public read wishes" on public.wishes
  for select using (status = 'visible');

create policy "public insert wishes" on public.wishes
  for insert with check (true);

create policy "public read blessings" on public.blessings
  for select using (status = 'visible');

create policy "public insert blessings" on public.blessings
  for insert with check (true);

-- RSVP rows are private: no public read. Only the aggregate count below is
-- exposed. Guests can still insert their RSVP when the event section is on.
create policy "public insert rsvps" on public.rsvps
  for insert with check (true);

-- Count of guests who plan to attend, exposed without revealing names.
-- Security definer so it bypasses the row-level read restriction.
create or replace function public.count_attending()
returns integer
language sql
security definer
set search_path = public
as $$
  select coalesce(sum(guests), 0)::integer
  from public.rsvps
  where attending = true
$$;

-- Race-safe heart increments (avoids lost updates from concurrent likes).
-- Delta is clamped to +/-1 regardless of what callers pass.
create or replace function public.increment_wish_hearts(row_id uuid, delta int default 1)
returns void
language sql
security definer
set search_path = public
as $$
  update public.wishes
  set hearts = greatest(0, hearts + greatest(-1, least(1, delta)))
  where id = row_id
$$;

create or replace function public.increment_blessing_hearts(row_id uuid, delta int default 1)
returns void
language sql
security definer
set search_path = public
as $$
  update public.blessings
  set hearts = greatest(0, hearts + greatest(-1, least(1, delta)))
  where id = row_id
$$;

revoke execute on function public.increment_wish_hearts(uuid, int) from public;
revoke execute on function public.increment_blessing_hearts(uuid, int) from public;
revoke execute on function public.count_attending() from public;
grant execute on function public.increment_wish_hearts(uuid, int) to anon, authenticated;
grant execute on function public.increment_blessing_hearts(uuid, int) to anon, authenticated;
grant execute on function public.count_attending() to anon, authenticated;

-- Ordering helper indexes for the walls.
create index if not exists wishes_created_at_idx on public.wishes (created_at desc);
create index if not exists blessings_created_at_idx on public.blessings (created_at desc);
create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);

-- Enable live updates for the public guestbook walls. The blocks are safe to
-- re-run after the tables have already been added to the publication.
do $$
begin
  alter publication supabase_realtime add table public.wishes;
exception
  when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.blessings;
exception
  when duplicate_object then null;
end $$;

-- ============================================================
-- Optional starter content.
-- Customize (or delete) these for each instance's graduate.
-- ============================================================
insert into public.wishes (name, message) values
  ('Mom & Dad', 'We are beyond proud of the person you have become. Watching you cross that stage was the honour of our lives. Congratulations, graduate!'),
  ('A Well-Wisher', 'From late-night study sessions to this moment — you did it! Wishing you every success in the next chapter.'),
  ('Your Mentor', 'One of the brightest minds I have had the pleasure to teach. The future is yours. Go build wonderful things.');

insert into public.blessings (label, hearts) values
  ('Endless Success', 8),
  ('Open Doors', 6),
  ('Divine Favor', 5),
  ('Bright Future', 7),
  ('Boundless Joy', 4),
  ('Wisdom & Growth', 3),
  ('Good Health', 5),
  ('New Beginnings', 6);
