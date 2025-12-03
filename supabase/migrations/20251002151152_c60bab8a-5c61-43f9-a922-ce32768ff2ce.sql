-- Create public storage bucket for article images (idempotent)
insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do nothing;

-- Allow public read/list access to files in this bucket
drop policy if exists "Public read access to article images" on storage.objects;
create policy "Public read access to article images"
on storage.objects
for select
using (bucket_id = 'article-images');

-- Allow anyone (including anon) to upload to this bucket (since app has no auth yet)
drop policy if exists "Anyone can upload article images" on storage.objects;
create policy "Anyone can upload article images"
on storage.objects
for insert
with check (bucket_id = 'article-images');

-- Allow updates and deletes (optional; can be tightened later when auth is added)
drop policy if exists "Anyone can update article images" on storage.objects;
create policy "Anyone can update article images"
on storage.objects
for update
using (bucket_id = 'article-images');

drop policy if exists "Anyone can delete article images" on storage.objects;
create policy "Anyone can delete article images"
on storage.objects
for delete
using (bucket_id = 'article-images');