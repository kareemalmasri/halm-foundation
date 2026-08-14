"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ARCHIVE_TYPES,
  ARCHIVE_YEARS,
  YEAR_FILTER_TYPE,
} from "@/lib/archive-filters";

type MemoryFilterBarProps = {
  // المسار المُلغَّم باللغة (مثل /ar/memory-bank) — وجهة إرسال النموذج
  action: string;
  selectedType: string;
  selectedYear: number | null;
  resultsCount: number;
};

const SELECT_CLASS =
  "min-w-40 rounded-md border border-gold/30 bg-ink px-3 py-2 text-white";

// شريط فلاتر يعمل عبر نموذج GET أصلي — يحدّث URL search params،
// والصفحة (Server Component) تعيد الاستعلام من القاعدة بشرط WHERE مطابق.
// عميل (client) لأن ظهور فلتر السنة يتبع اختيار النوع لحظياً قبل الإرسال.
export default function MemoryFilterBar({
  action,
  selectedType,
  selectedYear,
  resultsCount,
}: MemoryFilterBarProps) {
  const t = useTranslations("memoryBank");
  const [type, setType] = useState(selectedType);

  // فلتر السنة يخصّ أرشيف الصور وحده
  const showYear = type === YEAR_FILTER_TYPE;

  return (
    <form
      method="get"
      action={action}
      className="flex flex-col gap-4 rounded-lg border border-gold/20 bg-ink/40 p-5 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="flex flex-col gap-1 text-sm text-white/70">
          <span>{t("filters.type")}</span>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={SELECT_CLASS}
          >
            <option value="">{t("filters.all")}</option>
            {ARCHIVE_TYPES.map((archiveType) => (
              <option key={archiveType} value={archiveType}>
                {t(`types.${archiveType}`)}
              </option>
            ))}
          </select>
        </label>

        {showYear && (
          <label className="flex flex-col gap-1 text-sm text-white/70">
            <span>{t("filters.year")}</span>
            <select
              name="year"
              defaultValue={selectedYear ? String(selectedYear) : ""}
              className={SELECT_CLASS}
            >
              <option value="">{t("filters.all")}</option>
              {ARCHIVE_YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        )}

        <button
          type="submit"
          className="rounded-md bg-gold px-5 py-2 font-semibold text-ink transition-opacity hover:opacity-90"
        >
          {t("filters.apply")}
        </button>

        {(selectedType || selectedYear) && (
          <a
            href={action}
            className="rounded-md border border-gold/30 px-5 py-2 font-medium text-gold transition-colors hover:bg-gold/10"
          >
            {t("filters.reset")}
          </a>
        )}
      </div>

      <span className="text-sm text-white/50">
        {t("filters.resultsCount", { count: resultsCount })}
      </span>
    </form>
  );
}
