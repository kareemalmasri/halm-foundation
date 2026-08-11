"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
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
  const locale = useLocale();
  const isAr = locale === "ar";
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
        max-w-[1152px] بدل max-w-6xl (=72rem) تحديداً لهذا السبب: 72rem يعطي عرضاً مختلفاً
        فعلياً بين اللغتين (1152px إنجليزي مقابل 1267px عربي) بسبب تكبير font-size الجذر
        بالعربي، فتتفاوت كل الفجوات (شعار↔روابط↔مبدّل اللغة) رغم توازنها الداخلي.

        dir="ltr" مثبّت هنا عمداً: الشعار ومبدّل اللغة يبقيان بمكانهما الفيزيائي
        (شعار يسار، مبدّل يمين) بكلا اللغتين بدل انعكاسهما مع اتجاه الصفحة —
        الـnav وحده يستعيد اتجاهه الطبيعي (rtl/ltr) بالأسفل ليبقى ترتيب/شكل
        روابطه كما كان دون أي تغيير.
      */}
      <div dir="ltr" className="mx-auto flex max-w-[1152px] items-center justify-between px-[26.4px] py-[17.6px]">
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

        {/*
          عرض ثابت بالبكسل للـnav (800px، يكفي أعرض محتوى إنجليزي فعلي مقيس ~796px) —
          هكذا يبقى صندوق الـnav نفسه بنفس العرض بكلا اللغتين، فتوزيع justify-between
          الخارجي (بين الشعار والـnav، وبين الـnav ومبدّل اللغة) يصبح متطابقاً أيضاً.

          dir صريح هنا (rtl عربي / ltr إنجليزي) يستعيد ترتيب/شكل الروابط الطبيعي
          رغم أن الحاوية الأب مثبّتة على dir="ltr" فوق — والمحاذاة (start/end) هنا
          منطقية (تتبع dir الخاص بالـnav)، فتجمع الروابط دوماً عند الحافة الملاصقة
          فعلياً لمبدّل اللغة (يمين، ثاببت الآن)، وأي مساحة فائضة (عربي) تظهر عند
          طرف الشعار (يسار).
        */}
        <nav
          dir={isAr ? "rtl" : "ltr"}
          className={`hidden w-[800px] shrink-0 flex-wrap items-center justify-end gap-x-[66px] gap-y-2 text-[20px] lg:flex ${isAr ? "pl-[48px]" : ""}`}
        >
          {NAV_SECTIONS.map((key) => renderLink(key))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />

          {/* زر القائمة — يظهر تحت عرض lg، حيث لا تتّسع الشاشة لصندوق الروابط الثابت العرض */}
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

      {/* القائمة المنسدلة على الشاشات الصغيرة */}
      {open && (
        <nav className="flex flex-col gap-3 border-t border-gold/20 px-[26.4px] py-[17.6px] text-[20px] lg:hidden">
          {NAV_SECTIONS.map((key) => renderLink(key, () => setOpen(false)))}
        </nav>
      )}
    </header>
  );
}
