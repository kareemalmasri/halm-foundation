export const NAV_SECTIONS = [
  "home",
  "about",
  "training",
  "memory",
  "news",
  "contact",
] as const;

export type NavSection = (typeof NAV_SECTIONS)[number];

export const SECTION_HREFS: Record<NavSection, string> = {
  home: "/",
  about: "/about",
  training: "/training",
  memory: "/memory-bank",
  news: "/news",
  contact: "/contact",
};

export const OVERVIEW_SECTIONS = NAV_SECTIONS.filter(
  (key): key is Exclude<NavSection, "home"> => key !== "home"
);
