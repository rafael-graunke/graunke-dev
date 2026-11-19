import type { Metadata, Social } from "@types";

export const SITE = {
  NAME: "Rafael Graunke",
  TITLE: "Software Engineer — Backend & Full-Stack",
  // TODO: confirm the address once the Cloudflare Email Routing rule exists.
  EMAIL: "hello@graunke.dev",
  LOCATION: "Caxias do Sul, RS, Brazil",
  // TODO: add public/cv.pdf
  CV: "/cv.pdf",
  NUM_POSTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Rafael Graunke",
  DESCRIPTION:
    "Software engineer. Backend, full-stack, and the infrastructure underneath.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "Things I've built: what they solve, how they work, and what comes next.",
};

export const WRITING: Metadata = {
  TITLE: "Writing",
  DESCRIPTION: "Notes on backend, full-stack and infrastructure work.",
};

export const ABOUT: Metadata = {
  TITLE: "About",
  DESCRIPTION: "Infrastructure → backend and full-stack. Experience, skills and contact.",
};

export const SOCIALS: Social[] = [
  { NAME: "GitHub", HREF: "https://github.com/rafael-graunke" },
  { NAME: "LinkedIn", HREF: "https://www.linkedin.com/in/rafaelgraunke" },
];

// Posts with this tag are listed separately on /writing.
export const BUILD_LOG_TAG = "build-log";
