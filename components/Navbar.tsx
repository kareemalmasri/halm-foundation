"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { NAV_SECTIONS, SECTION_HREFS, type NavSection } from "@/components/nav-sections";
import { MenuIcon, XIcon } from "@/components/icons";

// أساس الأنماط المشترك بين روابط الـNavbar: أبيض افتراضياً، ذهبي عند hover،
// وخط سفلي بعرض الكلمة يتوسّع من العرض 0 إلى 1 (transform، لا width) عند hover فقط.
const LINK_BASE =
  "group relative inline-block w-fit text-white/90 transition-colors duration-300 hover:text-gold";
const LINK_UNDERLINE =
  "pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-center scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100";

export default function Navbar() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  // كل الروابط تنقّل حقيقي إلى مسار قسمها (SECTION_HREFS)
  const renderLink = (key: NavSection, onNavigate?: () => void) => (
    <Link
      key={key}
      href={SECTION_HREFS[key]}
      onClick={onNavigate}
      className={LINK_BASE}
    >
      {t(`navbar.${key}`)}
      <span className={LINK_UNDERLINE} aria-hidden="true" />
    </Link>
  );

  return (
    <header className="border-b border-gold/20 bg-ink">
      {/*
        قياسات ثابتة بالبكسل (لا rem) لكل عناصر الـNavbar، مطابقة لمظهره بالعربية —
        لأن rem يتحدد بحجم جذر الصفحة (html)، الذي يختلف بين اللغتين (Amiri/Cormorant)،
        فبقاء الـNavbar بحجم ثابت بغضّ النظر عن اللغة يتطلّب px صريحة بدل الوحدات النسبية.
      */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-[17.6px] px-[26.4px] py-[17.6px]">
        {/* الشعار */}
        <Link
          href="/"
          className="flex flex-none items-center transition-opacity hover:opacity-90"
        >
          <Image
            src="/images/logo-white.png"
            alt={t("logoAlt")}
            width={500}
            height={500}
            priority
            className="h-[88px] w-[88px]"
          />
        </Link>

        {/* روابط سطح المكتب — تنقّل حقيقي لكل قسم */}
        <nav className="hidden flex-wrap items-center gap-x-[66px] gap-y-2 text-[20px] sm:flex">
          {NAV_SECTIONS.map((key) => renderLink(key))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />

          {/* زر القائمة — يظهر فقط على الشاشات الصغيرة */}
          <button
            type="button"
            aria-label={t("navbar.menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-gold sm:hidden"
          >
            {open ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* القائمة المنسدلة على الشاشات الصغيرة */}
      {open && (
        <nav className="flex flex-col gap-3 border-t border-gold/20 px-[26.4px] py-[17.6px] text-[20px] sm:hidden">
          {NAV_SECTIONS.map((key) => renderLink(key, () => setOpen(false)))}
        </nav>
      )}
    </header>
  );
}
