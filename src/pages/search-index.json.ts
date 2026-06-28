import { getCollection, type CollectionEntry } from 'astro:content';

export async function GET() {
  const posts = await getCollection('blog', ({ data }: CollectionEntry<'blog'>) => !data.draft);
  const index = posts.map((p) => ({
    slug: p.id,
    title: p.data.title,
    description: p.data.description,
    tags: p.data.tags,
    category: p.data.category,
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
