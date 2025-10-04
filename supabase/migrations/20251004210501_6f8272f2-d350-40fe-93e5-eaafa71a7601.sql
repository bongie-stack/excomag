-- Enable UUID generation
create extension if not exists "pgcrypto";

-- Create articles table
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  excerpt text,
  content text,
  author text,
  category text,
  image_url text,
  media_urls text[],
  read_time text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- FK to auth.users
alter table public.articles
  drop constraint if exists articles_user_id_fkey,
  add constraint articles_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete cascade;

-- Enable RLS
alter table public.articles enable row level security;

-- Read policy for everyone
drop policy if exists "Public can read articles" on public.articles;
create policy "Public can read articles"
  on public.articles
  for select
  using (true);

-- Write policies for admins based on profiles.role = 'admin'
-- Insert
drop policy if exists "Admins can insert articles" on public.articles;
create policy "Admins can insert articles"
  on public.articles
  for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  );

-- Update
drop policy if exists "Admins can update articles" on public.articles;
create policy "Admins can update articles"
  on public.articles
  for update
  using (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  );

-- Delete
drop policy if exists "Admins can delete articles" on public.articles;
create policy "Admins can delete articles"
  on public.articles
  for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  );

-- updated_at trigger
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql set search_path = public;

drop trigger if exists trg_articles_updated_at on public.articles;
create trigger trg_articles_updated_at
before update on public.articles
for each row
execute function public.update_updated_at_column();