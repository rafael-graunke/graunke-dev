// Generates 1200×630 Open Graph images at build time for every page.
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import type { APIRoute, GetStaticPaths } from "astro";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { ABOUT, HOME, PROJECTS, SITE, WRITING } from "@consts";
import { STATUS_LABEL, getPosts, getProjects, projectSlug } from "@lib/utils";

type Card = { title: string; description: string; eyebrow: string };

export const getStaticPaths = (async () => {
  const pages: { route: string; card: Card }[] = [
    { route: "default", card: { title: SITE.NAME, description: HOME.DESCRIPTION, eyebrow: SITE.TITLE } },
    { route: "projects", card: { title: PROJECTS.TITLE, description: PROJECTS.DESCRIPTION, eyebrow: SITE.NAME } },
    { route: "writing", card: { title: WRITING.TITLE, description: WRITING.DESCRIPTION, eyebrow: SITE.NAME } },
    { route: "about", card: { title: ABOUT.TITLE, description: ABOUT.DESCRIPTION, eyebrow: SITE.NAME } },
  ];

  for (const project of await getProjects()) {
    const { title, summary, status, stack } = project.data;
    pages.push({
      route: `projects/${projectSlug(project)}`,
      card: { title, description: summary, eyebrow: `Project · ${STATUS_LABEL[status]} · ${stack.slice(0, 3).join(" · ")}` },
    });
  }

  for (const post of await getPosts()) {
    pages.push({
      route: `writing/${post.id}`,
      card: { title: post.data.title, description: post.data.summary, eyebrow: `Writing · ${post.data.tags.join(" · ")}` },
    });
  }

  return pages.map(({ route, card }) => ({ params: { route }, props: card }));
}) satisfies GetStaticPaths;

const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) => fs.readFile(require.resolve(`${pkg}/files/${file}`));

const fontsPromise = Promise.all([
  font("@fontsource/inter", "inter-latin-400-normal.woff"),
  font("@fontsource/inter", "inter-latin-600-normal.woff"),
  font("@fontsource/jetbrains-mono", "jetbrains-mono-latin-500-normal.woff"),
]);

type Node = { type: string; props: Record<string, unknown> & { children?: unknown } };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

export const GET: APIRoute = async ({ props }) => {
  const { title, description, eyebrow } = props as Card;
  const [inter400, inter600, mono500] = await fontsPromise;

  const tree = h(
    "div",
    {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "72px 80px",
      backgroundColor: "#18181B",
      color: "#F4F4F5",
      fontFamily: "Inter",
      borderTop: "8px solid #E8B062",
    },
    [
      h("div", { display: "flex", fontFamily: "JetBrains Mono", fontSize: 26, color: "#A1A1AA" }, eyebrow),
      h("div", { display: "flex", flexDirection: "column", gap: 24 }, [
        h("div", { fontSize: title.length > 40 ? 60 : 76, fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em" }, title),
        h("div", { fontSize: 30, lineHeight: 1.4, color: "#A1A1AA" }, description),
      ]),
      h("div", { display: "flex", fontFamily: "JetBrains Mono", fontSize: 28 }, [
        h("span", { color: "#F4F4F5" }, "graunke"),
        h("span", { color: "#E8B062" }, ".dev"),
      ]),
    ],
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Inter", data: inter400, weight: 400, style: "normal" },
      { name: "Inter", data: inter600, weight: 600, style: "normal" },
      { name: "JetBrains Mono", data: mono500, weight: 500, style: "normal" },
    ],
  });

  const png = new Resvg(svg).render().asPng();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
