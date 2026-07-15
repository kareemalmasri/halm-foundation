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
  memory: "/memory",
  news: "/news",
  contact: "/contact",
};
