import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    // Optional: defaults to the file name.
    slug: z.string().optional(),
    summary: z.string(),
    status: z.enum(["live", "in-progress", "done", "archived"]),
    featured: z.boolean().default(false),
    order: z.number(),
    stack: z.array(z.string()).default([]),
    links: z
      .object({
        repo: z.url().optional(),
        live: z.url().optional(),
        demo_video: z.url().optional(),
      })
      .default({}),
    cover: z.string().optional(),
    // Not rendered anywhere.
    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    related_project: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, posts };
