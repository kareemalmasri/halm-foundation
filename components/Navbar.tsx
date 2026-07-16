"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { NAV_SECTIONS, SECTION_HREFS, type NavSection } from "@/components/nav-sections";
import { MenuIcon, XIcon } from "@/components/icons";

export default function Navbar() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const renderLink = (key: NavSection, onNavigate?: () => void) =>
    key === "home" ? (
      <Link
        key={key}
        href={SECTION_HREFS[key]}
        onClick={onNavigate}
        className="transition-colors hover:text-gold"
      >
        {t(`navbar.${key}`)}
      </Link>
    ) : (
      <a
        key={key}
        href={`#${key}`}
        onClick={onNavigate}
        className="transition-colors hover:text-gold"
      >
        {t(`navbar.${key}`)}
      </a>
    );

  return (
    <header className="border-b border-gold/20 bg-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        {/* الشعار (نص مؤقت بلا صورة) */}
        <Link
          href="/"
          className="text-xl font-bold text-gold transition-opacity hover:opacity-90"
        >
          {t("siteName")}
        </Link>

        {/* روابط سطح المكتب — "الرئيسية" تنقّل حقيقي، والبقية مراسٍ إلى البطاقات */}
        <nav className="hidden flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gold/80 sm:flex">
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
        <nav className="flex flex-col gap-3 border-t border-gold/20 px-6 py-4 text-sm text-gold/80 sm:hidden">
          {NAV_SECTIONS.map((key) => renderLink(key, () => setOpen(false)))}
        </nav>
      )}
    </header>
  );
}
