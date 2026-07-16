// المفاتيح الستة المشتركة بين Navbar وشبكة بطاقات الأقسام
// (العناوين تُقرأ من navbar.<key>، والأوصاف من sections.items.<key>.description)
export const NAV_SECTIONS = [
  "home",
  "about",
  "training",
  "memory",
  "news",
  "contact",
] as const;

export type NavSection = (typeof NAV_SECTIONS)[number];

// المسار الرئيسي لكل قسم (بعضها غير مبني بعد — الروابط جاهزة مسبقاً)
export const SECTION_HREFS: Record<NavSection, string> = {
  home: "/",
  about: "/about",
  training: "/training",
  memory: "/memory-bank",
  news: "/news",
  contact: "/contact",
};

// أقسام بطاقات "نظرة عامة" — تستبعد "الرئيسية" لأنها self-referential
export const OVERVIEW_SECTIONS = NAV_SECTIONS.filter(
  (key): key is Exclude<NavSection, "home"> => key !== "home"
);
