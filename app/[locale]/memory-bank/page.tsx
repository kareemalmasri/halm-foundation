import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { normalizeType, normalizeYear } from "@/lib/archive-filters";
import Breadcrumb from "@/components/Breadcrumb";
import ArchiveGrid from "@/components/ArchiveGrid";
import MemoryFilterBar from "@/components/MemoryFilterBar";

export default async function MemoryBankPage({
  params,
  searchParams,
}: PageProps<"/[locale]/memory-bank">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sp = await searchParams;
  const rawType = typeof sp.type === "string" ? sp.type : "";
  const rawYear = typeof sp.year === "string" ? sp.year : "";
  const type = normalizeType(rawType);
  const year = normalizeYear(rawYear);

  // شرط WHERE حقيقي — يُبنى فقط من القيم المُتحقَّق منها (whitelist)
  const where = {
    ...(type ? { type } : {}),
    ...(year ? { year } : {}),
  };

  const items = await prisma.archiveItem.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const t = await getTranslations("memoryBank");
  const tNav = await getTranslations("navbar");
  const isAr = locale === "ar";

  // المسار المُلغَّم باللغة لإرسال نموذج الفلاتر إليه
  const action = getPathname({ href: "/memory-bank", locale });

  return (
    <main className="flex-1 bg-ink px-8 py-20">
      <div className="mx-auto max-w-6xl">
        <Breadcrumb
          items={[
            { label: tNav("home"), href: "/" },
            { label: tNav("memory") },
          ]}
        />

        <div className="mt-6 text-center">
          <h1 className="text-4xl font-bold text-gold sm:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white/70">
            {t("hero.summary")}
          </p>
        </div>

        <div className="mt-12">
          <MemoryFilterBar
            action={action}
            selectedType={type}
            selectedYear={year}
            resultsCount={items.length}
          />
        </div>

        {items.length === 0 ? (
          <div className="mt-16 rounded-lg border border-gold/20 bg-ink/40 px-6 py-16 text-center">
            <h2 className="text-2xl font-semibold text-gold">
              {t("empty.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-white/60">
              {t("empty.description")}
            </p>
          </div>
        ) : (
          <ArchiveGrid
            items={items.map((item) => ({
              id: item.id,
              type: item.type,
              title: isAr ? item.titleAr : item.titleEn,
              description: isAr ? item.descriptionAr : item.descriptionEn,
              typeLabel: t(`types.${item.type}`),
              yearLabel: item.year ? String(item.year) : null,
              fileUrl: item.fileUrl,
              fileUrlHd: item.fileUrlHd,
              thumbnailUrl: item.thumbnailUrl,
            }))}
          />
        )}
      </div>
    </main>
  );
}
