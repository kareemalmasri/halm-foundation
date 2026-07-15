import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { OVERVIEW_SECTIONS, SECTION_HREFS } from "@/components/nav-sections";
import { SECTION_ICONS } from "@/components/icons";

export default function SectionsOverview() {
  const t = useTranslations();

  return (
    <section className="bg-ink px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-gold">
          {t("sections.heading")}
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {OVERVIEW_SECTIONS.map((key) => {
            const Icon = SECTION_ICONS[key];
            return (
              <Link
                key={key}
                id={key}
                href={SECTION_HREFS[key]}
                className="scroll-mt-24 flex w-full flex-none flex-col gap-4 rounded-lg bg-ivory p-6 text-ink transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/30 sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-semibold text-ink">
                  {t(`navbar.${key}`)}
                </h3>
                <p className="leading-relaxed text-ink/70">
                  {t(`sections.items.${key}.description`)}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
