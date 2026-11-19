# graunke.dev

Personal portfolio of Rafael Graunke. Static Astro site, Markdown content, deployed to Cloudflare Workers (static assets) with Wrangler.

- **Stack:** Astro 7 (static output), Tailwind CSS 4, Shiki, Mermaid (loaded only on pages with diagrams), satori for OG images.
- **No CMS, no database, no backend.** Adding content = adding a Markdown file.

## Commands

Requires Node.js ≥ 22.23.

| Command           | Action                                                     |
| ----------------- | ---------------------------------------------------------- |
| `npm install`     | Install dependencies                                       |
| `npm run dev`     | Dev server at `localhost:4321`                             |
| `npm run check`   | Type-check (`astro check`)                                 |
| `npm run build`   | Type-check and build to `./dist/`                          |
| `npm run preview` | Build, then serve `./dist` locally with `wrangler dev`     |
| `npm run deploy`  | Build, then `wrangler deploy` to Cloudflare                |

## Adding a project

Create `src/content/projects/<slug>.md`. The file name becomes the URL (`/projects/<slug>`) unless `slug` is set.

```markdown
---
title: "My Project"
summary: "One sentence."
status: in-progress        # live | in-progress | done | archived
featured: false            # featured projects appear on the home page
order: 3                   # sort order on home/projects (ascending)
stack: [Python, FastAPI]
links:
  repo: https://github.com/rafael-graunke/my-project
  live: https://example.com
  demo_video: https://youtube.com/...
cover: /projects/my-project/cover.png   # optional, file goes in public/
draft: false               # true = not rendered anywhere
---

## Problem
## How it works
## Decisions & trade-offs
## What's next / what I'd do differently
```

Skip any section that has no real content yet. The **Links** section is rendered automatically from `links`. Mark planned features as **Planned**. Use `<span class="todo">TODO</span>` for visible placeholders.

## Adding a post

Create `src/content/posts/<slug>.md` (URL: `/writing/<slug>`):

```markdown
---
title: "Exporting video in the browser with WebCodecs"
date: 2026-11-20
summary: "One or two sentences."
tags: [webcodecs, webgl]
related_project: spellsplice  # optional, project slug
draft: false
---

Post body…
```

- Posts tagged `build-log` are listed in a separate "Build log" section on `/writing`.
- `draft: true` keeps a post out of the site and the RSS feed. With no published posts, the home page hides "Latest writing" and `/writing` shows "Posts coming soon".
- There's a draft stub in `src/content/posts/exporting-video-in-the-browser-with-webcodecs.md`: write the body, set the date and `draft: false`.
- Commit and push; the site redeploys (see below).

### Markdown features

- **Code** is highlighted by Shiki (light/dark themes).
- **Tables** render with GitHub-flavored Markdown and scroll horizontally on small screens.
- **Diagrams:** use a ` ```mermaid ` code block, or put an SVG/PNG in `public/` and reference it with `![alt text](/path.svg)`.
- Use `.mdx` if you need components.

## Generated extras

- `/rss.xml` (posts), `/sitemap-index.xml`, `/robots.txt`
- Open Graph images at `/og/...png`, generated at build time for every page, project and post (`src/pages/og/[...route].png.ts`).

## Deploying to Cloudflare

The site is served as static assets by a Cloudflare Worker. This is Cloudflare's recommended replacement for Pages for new projects: same free static hosting, same push-to-deploy flow. Config: `wrangler.jsonc`.

### One-time setup

1. Log in: `npx wrangler login`.
2. First deploy: `npm run deploy`. This creates the `graunke-dev` Worker and attaches the custom domain `graunke.dev` (the `routes` entry in `wrangler.jsonc`; the zone must be on the same Cloudflare account). It also serves on `graunke-dev.<account>.workers.dev`.

### Deploy on push to `main` (Workers Builds)

1. Cloudflare dashboard → **Workers & Pages** → the `graunke-dev` Worker → **Settings → Build** → connect the GitHub repo `rafael-graunke/graunke-dev`.
2. Build command: `npm run build`. Deploy command: `npx wrangler deploy`. Production branch: `main`.
3. Optional: set the `NODE_VERSION` build variable to `24` or later.

Every push to `main` builds and deploys. Pushes to other branches get preview URLs.

## TODO before launch

- [ ] Add `public/cv.pdf`.
- [ ] Confirm the contact email (`SITE.EMAIL` in `src/consts.ts`, currently `hello@graunke.dev`) and create the Email Routing rule.
- [ ] Write the Spellsplice case study (`src/content/projects/spellsplice.md`).
- [ ] Decide whether to publish chip8-rs (`draft: true` in `src/content/projects/chip8-rs.md`).

## License

MIT. Based on the [Astro Nano](https://github.com/markhorn-dev/astro-nano) template.
