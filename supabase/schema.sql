-- Kweshun core schema: profiles, questions, friendships, notifications, battles.
-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.
-- Safe to re-run: every statement uses IF NOT EXISTS / OR REPLACE / drop-then-create for policies.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- profiles: one row per auth.users row, holds the app-facing profile fields.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  avatar_emoji text not null default '🙂',
  avatar_tint text not null default '#1e3a5f',
  score integer not null default 0,
  streak integer not null default 0,
  week_gain integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles are publicly readable" on public.profiles;
create policy "profiles are publicly readable"
  on public.profiles for select
  using (true);

drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, split_part(new.email, '@', 1))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- questions: published/pending/draft questions written by a profile.
-- ---------------------------------------------------------------------------
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  text text not null,
  subject text not null,
  level text,
  status text not null default 'Pending' check (status in ('Live', 'Pending', 'Draft')),
  equation text,
  image_url text,
  quality_score integer,
  plays_count integer not null default 0,
  correct_count integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists questions_author_id_idx on public.questions(author_id);
create index if not exists questions_status_idx on public.questions(status);

alter table public.questions enable row level security;

drop policy if exists "live questions are publicly readable" on public.questions;
create policy "live questions are publicly readable"
  on public.questions for select
  using (status = 'Live');

drop policy if exists "authors can read own questions" on public.questions;
create policy "authors can read own questions"
  on public.questions for select
  using (auth.uid() = author_id);

drop policy if exists "authors can insert own questions" on public.questions;
create policy "authors can insert own questions"
  on public.questions for insert
  with check (auth.uid() = author_id);

drop policy if exists "authors can update own questions" on public.questions;
create policy "authors can update own questions"
  on public.questions for update
  using (auth.uid() = author_id);

drop policy if exists "authors can delete own questions" on public.questions;
create policy "authors can delete own questions"
  on public.questions for delete
  using (auth.uid() = author_id);

-- ---------------------------------------------------------------------------
-- friendships: one row per pair, status pending -> accepted.
-- ---------------------------------------------------------------------------
create table if not exists public.friendships (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.profiles(id) on delete cascade,
  addressee_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted')),
  created_at timestamptz not null default now(),
  check (requester_id <> addressee_id)
);

create unique index if not exists friendships_pair_uidx
  on public.friendships (least(requester_id, addressee_id), greatest(requester_id, addressee_id));

alter table public.friendships enable row level security;

drop policy if exists "participants can read own friendships" on public.friendships;
create policy "participants can read own friendships"
  on public.friendships for select
  using (auth.uid() = requester_id or auth.uid() = addressee_id);

drop policy if exists "users can send friend requests" on public.friendships;
create policy "users can send friend requests"
  on public.friendships for insert
  with check (auth.uid() = requester_id);

drop policy if exists "addressee can accept request" on public.friendships;
create policy "addressee can accept request"
  on public.friendships for update
  using (auth.uid() = addressee_id);

drop policy if exists "participants can delete friendship" on public.friendships;
create policy "participants can delete friendship"
  on public.friendships for delete
  using (auth.uid() = requester_id or auth.uid() = addressee_id);

-- ---------------------------------------------------------------------------
-- notifications: per-user feed of events.
-- NOTE: insert policy is intentionally permissive (any signed-in user may
-- notify another user) since notifications are triggered by one user's
-- action affecting another (friend request, battle challenge, etc). This
-- is fine for now; a later stage can move creation into a security-definer
-- RPC/trigger for tighter control if it becomes a problem.
-- ---------------------------------------------------------------------------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null default 'System' check (kind in ('Battles', 'Friends', 'System')),
  title text not null,
  body text not null,
  icon text,
  tint text,
  unread boolean not null default true,
  action_label text,
  target_page text,
  related_id uuid,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_id_idx on public.notifications(user_id, unread);

alter table public.notifications enable row level security;

drop policy if exists "users can read own notifications" on public.notifications;
create policy "users can read own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

drop policy if exists "signed-in users can create notifications" on public.notifications;
create policy "signed-in users can create notifications"
  on public.notifications for insert
  with check (auth.uid() is not null);

drop policy if exists "users can update own notifications" on public.notifications;
create policy "users can update own notifications"
  on public.notifications for update
  using (auth.uid() = user_id);

drop policy if exists "users can delete own notifications" on public.notifications;
create policy "users can delete own notifications"
  on public.notifications for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- battles: one row per challenger/opponent match on a topic.
-- ---------------------------------------------------------------------------
create table if not exists public.battles (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  topic text not null,
  level text,
  challenger_id uuid not null references public.profiles(id) on delete cascade,
  opponent_id uuid not null references public.profiles(id) on delete cascade,
  challenger_question text,
  challenger_score integer,
  opponent_question text,
  opponent_score integer,
  status text not null default 'pending' check (status in ('pending', 'active', 'completed')),
  winner_id uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  check (challenger_id <> opponent_id)
);

create index if not exists battles_challenger_id_idx on public.battles(challenger_id);
create index if not exists battles_opponent_id_idx on public.battles(opponent_id);

alter table public.battles enable row level security;

drop policy if exists "participants can read own battles" on public.battles;
create policy "participants can read own battles"
  on public.battles for select
  using (auth.uid() = challenger_id or auth.uid() = opponent_id);

drop policy if exists "challenger can create battle" on public.battles;
create policy "challenger can create battle"
  on public.battles for insert
  with check (auth.uid() = challenger_id);

drop policy if exists "participants can update own battle" on public.battles;
create policy "participants can update own battle"
  on public.battles for update
  using (auth.uid() = challenger_id or auth.uid() = opponent_id);
