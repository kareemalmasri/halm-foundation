"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { NAV_SECTIONS, SECTION_HREFS, type NavSection } from "@/components/nav-sections";
import { MenuIcon, XIcon } from "@/components/icons";

const LINK_BASE =
  "group relative inline-block w-fit text-white/90 transition-colors duration-300 hover:text-gold";
const LINK_UNDERLINE =
  "pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-center scale-x-0 bg-gold transition-transform duration-300 ease-out group-hover:scale-x-100";

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const isAr = locale === "ar";
  const [open, setOpen] = useState(false);

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
      <div dir="ltr" className="mx-auto flex max-w-[1152px] items-center justify-between px-[26.4px] py-[17.6px]">
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

        <nav
          dir={isAr ? "rtl" : "ltr"}
          className={`hidden w-[800px] shrink-0 flex-wrap items-center justify-end gap-x-[66px] gap-y-2 text-[20px] lg:flex ${isAr ? "pl-[48px]" : ""}`}
        >
          {NAV_SECTIONS.map((key) => renderLink(key))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />

          <button
            type="button"
            aria-label={t("navbar.menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-gold lg:hidden"
          >
            {open ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-3 border-t border-gold/20 px-[26.4px] py-[17.6px] text-[20px] lg:hidden">
          {NAV_SECTIONS.map((key) => renderLink(key, () => setOpen(false)))}
        </nav>
      )}
    </header>
  );
}
