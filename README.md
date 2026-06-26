# Astro Blog Starter

A production-ready blog template built with [Astro](https://astro.build), Tailwind CSS v4, and MDX. Ships with everything you need: dark mode, full-text search, RSS, sitemap, SEO, and structured data — zero configuration required.

## Features

- **Astro 7** with static output — near-perfect Lighthouse scores out of the box
- **Tailwind CSS v4** for styling with a CSS variable-based theme system
- **MDX** support for rich, component-enhanced posts
- **Dark mode** — flash-free, respects system preference, persists to localStorage
- **Full-text search** powered by Fuse.js — works without a backend
- **RSS feed** at `/rss.xml`
- **Sitemap** auto-generated via `@astrojs/sitemap`
- **SEO** — canonical URLs, Open Graph, Twitter Card, JSON-LD structured data (BlogPosting, BreadcrumbList, WebSite, Organization), robots.txt, web manifest
- **Pagination** with correct `rel=prev/next` signals
- **Content collections** with full type safety via Zod schemas
- **Authors** as a separate collection, referenced from posts
- **Tag and category pages** with dedicated listing routes
- **Related posts** based on shared tags
- **Table of contents** auto-generated from headings
- **Reading time** estimate on every post
- **Back to top** button
- **Keyboard shortcut** `Ctrl+K` / `⌘K` to open search

## Tech Stack

| Tool | Purpose |
| --- | --- |
| [Astro 7](https://astro.build) | Framework |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling |
| [MDX](https://mdxjs.com) | Post authoring |
| [Fuse.js](https://fusejs.io) | Client-side search |
| [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | Sitemap generation |
| [@astrojs/rss](https://docs.astro.build/en/guides/rss/) | RSS feed |

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/astro-blog-starter.git
cd astro-blog-starter
pnpm install
```

### 2. Configure your site

Copy the example env file and set your domain:

```bash
cp .env.example .env
```

Edit `.env`:

```env
SITE_URL=https://yourdomain.com
```

> The `SITE_URL` is used for canonical URLs, OG images, the sitemap, and JSON-LD structured data. Set it to your production domain before building.

### 3. Update site identity

Open these files and replace the placeholder values:

| File | What to change |
| --- | --- |
| `src/components/global/Navbar.astro` | Site name and logo letter |
| `src/components/global/Footer.astro` | Site name |
| `src/components/seo/SEO.astro` | `siteName` constant |
| `src/pages/rss.xml.ts` | Feed title and description |
| `public/site.webmanifest` | `name`, `short_name`, `description`, `theme_color` |
| `public/robots.txt` | Sitemap URL (update domain) |

### 4. Add your authors

Edit or replace the files in `src/content/authors/`. Each author is a JSON file:

```json
{
  "name": "Your Name",
  "bio": "A short bio (max 300 chars).",
  "twitter": "yourhandle",
  "github": "yourusername",
  "website": "https://yoursite.com"
}
```

The filename (without `.json`) is the author ID — reference it in post frontmatter as `author: your-name`.

### 5. Write your first post

Create a `.mdx` file in `src/content/blog/`:

```mdx
---
title: "My First Post"
description: "A short description shown in cards and meta tags."
publishDate: 2026-01-01
author: your-name
category: Tutorial
tags: [astro, webdev]
featured: false
popularity: 0
draft: false
---

Your content here.
```

**Frontmatter fields:**

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | Yes | Max 80 chars |
| `description` | string | Yes | Max 200 chars, used in meta tags |
| `publishDate` | date | Yes | `YYYY-MM-DD` format |
| `updatedDate` | date | No | Shown as last updated |
| `author` | string | Yes | Must match a filename in `src/content/authors/` |
| `category` | enum | Yes | One of: `Tutorial`, `Opinion`, `News`, `Case Study`, `Guide`, `Reference` |
| `tags` | string[] | No | Used for tag pages and related posts |
| `coverImage` | image | No | Optimised at build time by Astro |
| `coverImageAlt` | string | No | Alt text for cover image |
| `featured` | boolean | No | Shows post in the featured slot on the homepage |
| `popularity` | number | No | 0–100, used to sort the Popular Articles section |
| `draft` | boolean | No | `true` excludes from build |

### 6. Customise the theme

All colours are CSS custom properties in `src/styles/theme.css`. Change the accent colour:

```css
:root {
  --color-accent: #6366f1;   /* light mode */
}

[data-theme="dark"] {
  --color-accent: #818cf8;   /* dark mode */
}
```

### 7. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321).

## Project Structure

```text
src/
├── components/
│   ├── blog/          # PostCard, AuthorCard, TOC, Pagination, etc.
│   ├── global/        # Navbar, Footer, ThemeToggle, BackToTop
│   ├── home/          # FeaturedPost, PopularArticles, LatestArticles
│   ├── search/        # SearchBox (Fuse.js powered)
│   └── seo/           # SEO meta tag component
├── content/
│   ├── authors/       # Author JSON files
│   └── blog/          # MDX blog posts
├── layouts/
│   ├── BaseLayout.astro     # HTML shell, SEO injection
│   ├── BlogLayout.astro     # Article layout with TOC sidebar
│   └── PageLayout.astro     # General page wrapper
├── pages/
│   ├── index.astro                # Homepage
│   ├── blog/
│   │   ├── index.astro            # Blog listing (page 1)
│   │   ├── [slug].astro           # Individual post
│   │   └── page/[page].astro      # Paginated listing
│   ├── tags/
│   │   ├── index.astro            # All tags
│   │   └── [tag].astro            # Posts by tag
│   ├── category/[category].astro
│   ├── authors/[author].astro
│   ├── rss.xml.ts
│   └── search-index.json.ts
├── styles/
│   ├── global.css     # Base styles
│   └── theme.css      # CSS custom properties (light + dark)
└── utils/
    ├── reading-time.ts
    ├── slugify.ts
    └── sort-posts.ts
```

## Building for Production

```bash
pnpm build
```

Output goes to `dist/`. The sitemap is generated at `dist/sitemap-index.xml`. Preview the build locally:

```bash
pnpm preview
```

## Deployment

This is a fully static site — deploy the `dist/` folder anywhere. Remember to set `SITE_URL` as an environment variable on your hosting platform.

| Platform | Notes |
| --- | --- |
| **Vercel** | Framework preset: Astro. Add `SITE_URL` in project settings. |
| **Netlify** | Build command: `pnpm build`. Add `SITE_URL` in site environment variables. |
| **Cloudflare Pages** | Build command: `pnpm build`, output: `dist`. Add `SITE_URL` in environment variables. |
| **GitHub Pages** | See the [Astro deploy guide](https://docs.astro.build/en/guides/deploy/github/). |

## Type Checking

```bash
pnpm exec astro check
```

## License

MIT — see [LICENSE](LICENSE).
