import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://graunke.dev",
  trailingSlash: "never",
  build: { format: "file" },
  compressHTML: true,
  integrations: [mdx(), sitemap()],
  markdown: {
    syntaxHighlight: {
      type: "shiki",
      // Mermaid blocks are rendered client-side by src/components/Mermaid.astro
      excludeLangs: ["mermaid", "math"],
    },
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark-dimmed",
      },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
