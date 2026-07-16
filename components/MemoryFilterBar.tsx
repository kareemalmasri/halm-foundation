import { getTranslations } from "next-intl/server";
import { ARCHIVE_TYPES, ARCHIVE_ERAS } from "@/lib/archive-filters";

type MemoryFilterBarProps = {
  // المسار المُلغَّم باللغة (مثل /ar/memory-bank) — وجهة إرسال النموذج
  action: string;
  selectedType: string;
  selectedEra: string;
  resultsCount: number;
};

// شريط فلاتر يعمل عبر نموذج GET أصلي — يحدّث URL search params،
// والصفحة (Server Component) تعيد الاستعلام من القاعدة بشرط WHERE مطابق.
export default async function MemoryFilterBar({
  action,
  selectedType,
  selectedEra,
  resultsCount,
}: MemoryFilterBarProps) {
  const t = await getTranslations("memoryBank");

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
            defaultValue={selectedType}
            className="min-w-40 rounded-md border border-gold/30 bg-ink px-3 py-2 text-white"
          >
            <option value="">{t("filters.all")}</option>
            {ARCHIVE_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(`types.${type}`)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-white/70">
          <span>{t("filters.era")}</span>
          <select
            name="era"
            defaultValue={selectedEra}
            className="min-w-40 rounded-md border border-gold/30 bg-ink px-3 py-2 text-white"
          >
            <option value="">{t("filters.all")}</option>
            {ARCHIVE_ERAS.map((era) => (
              <option key={era} value={era}>
                {t(`eras.${era}`)}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="rounded-md bg-gold px-5 py-2 font-semibold text-ink transition-opacity hover:opacity-90"
        >
          {t("filters.apply")}
        </button>

        {(selectedType || selectedEra) && (
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
