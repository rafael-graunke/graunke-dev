import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE, WRITING } from "@consts";
import { getPosts } from "@lib/utils";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${SITE.NAME} — ${WRITING.TITLE}`,
    description: WRITING.DESCRIPTION,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      categories: post.data.tags,
      link: `/writing/${post.id}`,
    })),
  });
}
