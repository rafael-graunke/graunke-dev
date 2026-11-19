import { getCollection, type CollectionEntry } from "astro:content";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function readingTime(body = "") {
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export function projectSlug(project: CollectionEntry<"projects">) {
  return project.data.slug ?? project.id;
}

export async function getProjects() {
  return (await getCollection("projects", ({ data }) => !data.draft)).sort(
    (a, b) => a.data.order - b.data.order,
  );
}

export async function getPosts() {
  return (await getCollection("posts", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

export const STATUS_LABEL: Record<CollectionEntry<"projects">["data"]["status"], string> = {
  live: "Live",
  "in-progress": "Working on",
  done: "Done",
  archived: "Archived",
};

// With build.format "file", Astro.url.pathname ends in ".html" at build time.
export function cleanPath(pathname: string) {
  return pathname.replace(/(\/index)?\.html$/, "").replace(/\/$/, "") || "/";
}
