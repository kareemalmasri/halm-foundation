"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { GlobeIcon } from "@/components/icons";

// aria-label بلغة الصفحة الحالية، يصف الانتقال إلى اللغة الأخرى
const SWITCH_LABEL: Record<string, string> = {
  ar: "التبديل إلى الإنجليزية",
  en: "Switch to Arabic",
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname(); // المسار بدون بادئة اللغة
  const router = useRouter();
  const other = locale === "ar" ? "en" : "ar";

  // الحرف يشير إلى اللغة الحالية المعروضة فعلياً، لا اللغة المقصودة
  const currentLetter = locale === "ar" ? "ع" : "E";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: other })}
      aria-label={SWITCH_LABEL[locale]}
      className="relative flex h-[39.6px] w-[39.6px] items-center justify-center rounded-full border border-gold bg-ivory text-ink transition-opacity hover:opacity-90 sm:h-[44px] sm:w-[44px]"
    >
      <GlobeIcon className="h-full w-full p-[6.6px]" />
      <span
        aria-hidden="true"
        className="absolute -bottom-1 -end-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-ivory bg-gold text-[13.2px] font-bold leading-none text-ink"
      >
        {currentLetter}
      </span>
    </button>
  );
}
