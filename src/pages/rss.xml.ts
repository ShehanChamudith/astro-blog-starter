import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../config';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }: CollectionEntry<'blog'>) => !data.draft);
  const sorted = posts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>${SITE.rssLanguage}</language>`,
  });
}
