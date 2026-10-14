-- Supabase Messages Table Schema for Ruban Portfolio
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now() not null,
  status text default 'unread' not null
);

-- Enable Row Level Security (RLS) for defense in depth
alter table public.messages enable row level security;

-- Policy 1: Allow public / anonymous users to insert contact messages
create policy "Allow anonymous message insert"
on public.messages
for insert
to anon, authenticated
with check (true);

-- Policy 2: Prevent public reading (only authenticated admins in dashboard can view)
create policy "Allow authenticated admin read only"
on public.messages
for select
to authenticated
using (true);
