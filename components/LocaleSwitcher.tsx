"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname(); // المسار بدون بادئة اللغة
  const router = useRouter();
  const other = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: other })}
      className="rounded border border-gold bg-ivory px-3 py-2 text-ink transition-opacity hover:opacity-90"
    >
      {other === "ar" ? "العربية" : "English"}
    </button>
  );
}
