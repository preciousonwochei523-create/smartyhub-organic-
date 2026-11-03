-- SmartyHub Organic: full Supabase setup.
-- Run once: Supabase Dashboard > SQL Editor > New query > paste all > Run.
-- STEP 0: change the email below to the one you will use to sign in to admin.html.

create table if not exists admin_emails (email text primary key);
insert into admin_emails values ('YOUR_EMAIL@example.com') on conflict do nothing;
alter table admin_emails enable row level security;  -- no policies = not readable from the API

create or replace function public.is_admin() returns boolean
language sql security definer set search_path = public stable as $$
  select exists (select 1 from admin_emails
                 where lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;

-- Catalog -------------------------------------------------------------
create table if not exists items (
  id text primary key,
  kind text not null check (kind in ('eat','supp')),
  data jsonb not null,
  sort int default 0,
  updated_at timestamptz default now()
);
create table if not exists settings (key text primary key, value jsonb not null);

alter table items enable row level security;
alter table settings enable row level security;
drop policy if exists items_read on items;
drop policy if exists items_admin on items;
drop policy if exists settings_read on settings;
drop policy if exists settings_admin on settings;
create policy items_read on items for select using (true);
create policy items_admin on items for all using (is_admin()) with check (is_admin());
-- Public can only read site settings. Kitchen and rider phone numbers stay private.
create policy settings_read on settings for select
  using (key in ('eatCats','suppCats','hero','zones') or is_admin());
create policy settings_admin on settings for all using (is_admin()) with check (is_admin());

-- Starter delivery zones (EDIT the fees in admin > Delivery & Partners)
insert into settings (key, value) values
 ('zones', '[{"name":"Ikeja","fee":1500},{"name":"Alimosho","fee":1500},{"name":"Ajah","fee":2000},{"name":"Other Lagos area","fee":null}]'),
 ('kitchens', '[]'), ('riders', '[]')
on conflict (key) do nothing;

-- Orders --------------------------------------------------------------
create sequence if not exists order_seq start 1001;
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  ref text unique not null,
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new','preparing','out','delivered','cancelled')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','paid')),
  customer_name text not null,
  phone text not null,
  address text not null,
  landmark text,
  zone text,
  note text,
  items jsonb not null,
  subtotal int not null,
  delivery_fee int not null default 0,
  total int not null,
  free_sachet boolean not null default false,
  kitchen text,
  rider text
);
alter table orders enable row level security;
drop policy if exists orders_admin on orders;
create policy orders_admin on orders for all using (is_admin()) with check (is_admin());
-- Visitors cannot read or write orders directly. They go through place_order() below.

create or replace function public.place_order(p jsonb) returns jsonb
language plpgsql security definer set search_path = public as $$
declare z jsonb; fee int := 0; sub int; r text;
begin
  if coalesce(trim(p->>'name'),'') = '' or coalesce(trim(p->>'phone'),'') = ''
     or coalesce(trim(p->>'addr'),'') = '' then raise exception 'Missing details'; end if;
  if jsonb_typeof(p->'items') <> 'array' or jsonb_array_length(p->'items') not between 1 and 50
     then raise exception 'Bad cart'; end if;
  sub := (p->>'subtotal')::int;
  if sub <= 0 or sub > 2000000 then raise exception 'Bad total'; end if;
  select e into z from (select value from settings where key = 'zones') s,
    jsonb_array_elements(s.value) e where e->>'name' = p->>'zone' limit 1;
  if z is not null and jsonb_typeof(z->'fee') = 'number' then fee := (z->>'fee')::int; end if;
  r := 'SHO-' || nextval('order_seq');
  insert into orders (ref, customer_name, phone, address, landmark, zone, note, items,
                      subtotal, delivery_fee, total, free_sachet)
  values (r, left(trim(p->>'name'),100), left(trim(p->>'phone'),30), left(trim(p->>'addr'),300),
          left(p->>'landmark',200), left(p->>'zone',100), left(p->>'note',300), p->'items',
          sub, fee, sub + fee, coalesce((p->>'sachet')::boolean, false));
  return jsonb_build_object('ref', r, 'fee', fee);
end $$;
revoke all on function public.place_order(jsonb) from public;
grant execute on function public.place_order(jsonb) to anon, authenticated;

-- Product photo storage -------------------------------------------------
insert into storage.buckets (id, name, public) values ('product-images','product-images', true)
on conflict (id) do nothing;
drop policy if exists img_read on storage.objects;
drop policy if exists img_admin on storage.objects;
create policy img_read on storage.objects for select using (bucket_id = 'product-images');
create policy img_admin on storage.objects for all
  using (bucket_id = 'product-images' and is_admin())
  with check (bucket_id = 'product-images' and is_admin());
