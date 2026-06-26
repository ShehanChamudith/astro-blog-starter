import type { CollectionEntry } from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;

export function sortByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );
}

export function sortByPopularity(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.data.popularity - a.data.popularity);
}

export function getRelatedPosts(current: BlogPost, all: BlogPost[], limit = 3): BlogPost[] {
  const others = all.filter((p) => p.id !== current.id);
  const scored = others.map((p) => {
    let score = 0;
    if (p.data.category === current.data.category) score += 3;
    const sharedTags = p.data.tags.filter((t) => current.data.tags.includes(t));
    score += sharedTags.length;
    return { post: p, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}
