import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(80),
      description: z.string().max(200),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: reference('authors'),
      category: z.enum(['Tutorial', 'Opinion', 'News', 'Case Study', 'Guide', 'Reference']),
      tags: z.array(z.string()).default([]),
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),
      featured: z.boolean().default(false),
      popularity: z.number().int().min(0).max(100).default(0),
      draft: z.boolean().default(false),
    }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    bio: z.string().max(300),
    twitter: z.string().optional(),
    github: z.string().optional(),
    website: z.string().refine((v) => URL.canParse(v), { message: 'Invalid URL' }).optional(),
  }),
});

export const collections = { blog, authors };
