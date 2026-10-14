-- Supabase Production Schema for Ruban Portfolio
-- Instructions: In Supabase SQL Editor, make sure NO text is highlighted/selected, then click Run.

-- 1. Contact Form Messages Table
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now() not null,
  status text default 'unread' not null
);

alter table public.messages enable row level security;

drop policy if exists "Allow anonymous message insert" on public.messages;
drop policy if exists "Allow authenticated admin read only" on public.messages;

create policy "Allow anonymous message insert"
on public.messages
for insert
to anon, authenticated
with check (true);

create policy "Allow authenticated admin read only"
on public.messages
for all
to authenticated
using (true);


-- 2. Technical Blog Posts Table (Persistent Storage)
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  description text not null,
  category text not null,
  tags text[] default '{}'::text[],
  content text not null,
  reading_time text default '5 min read',
  featured boolean default false,
  draft boolean default false,
  author_name text default 'Ruban',
  author_role text default 'Network Engineer & Systems Architect',
  author_avatar text default '/images/ruban-profile.jpg',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.posts enable row level security;

drop policy if exists "Allow public read published posts" on public.posts;
drop policy if exists "Allow insert new posts" on public.posts;
drop policy if exists "Allow authenticated admin full access" on public.posts;

create policy "Allow public read published posts"
on public.posts
for select
to anon, authenticated
using (draft = false);

create policy "Allow insert new posts"
on public.posts
for insert
to anon, authenticated
with check (true);

create policy "Allow authenticated admin full access"
on public.posts
for all
to authenticated
using (true);


-- 3. Blog Post Likes Table
create table if not exists public.post_likes (
  id uuid default gen_random_uuid() primary key,
  post_slug text not null,
  client_id text not null,
  created_at timestamptz default now() not null,
  unique(post_slug, client_id)
);

alter table public.post_likes enable row level security;

drop policy if exists "Allow public read likes" on public.post_likes;
drop policy if exists "Allow public toggle likes" on public.post_likes;
drop policy if exists "Allow public delete likes" on public.post_likes;

create policy "Allow public read likes"
on public.post_likes
for select
to anon, authenticated
using (true);

create policy "Allow public toggle likes"
on public.post_likes
for insert
to anon, authenticated
with check (true);

create policy "Allow public delete likes"
on public.post_likes
for delete
to anon, authenticated
using (true);


-- 4. Blog Post Comments Table
create table if not exists public.post_comments (
  id uuid default gen_random_uuid() primary key,
  post_slug text not null,
  author_name text not null,
  content text not null,
  created_at timestamptz default now() not null,
  status text default 'approved' not null
);

alter table public.post_comments enable row level security;

drop policy if exists "Allow public read approved comments" on public.post_comments;
drop policy if exists "Allow public insert comments" on public.post_comments;
drop policy if exists "Allow admin manage comments" on public.post_comments;

create policy "Allow public read approved comments"
on public.post_comments
for select
to anon, authenticated
using (status = 'approved');

create policy "Allow public insert comments"
on public.post_comments
for insert
to anon, authenticated
with check (true);

create policy "Allow admin manage comments"
on public.post_comments
for all
to authenticated
using (true);
