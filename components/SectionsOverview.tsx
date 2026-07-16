import { useTranslations } from "next-intl";
import { OVERVIEW_SECTIONS, SECTION_HREFS } from "@/components/nav-sections";
import { SECTION_ICONS } from "@/components/icons";
import CardLink from "@/components/CardLink";

export default function SectionsOverview() {
  const t = useTranslations();

  return (
    <section className="bg-ink px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-gold">
          {t("sections.heading")}
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {OVERVIEW_SECTIONS.map((key) => (
            <CardLink
              key={key}
              id={key}
              href={SECTION_HREFS[key]}
              Icon={SECTION_ICONS[key]}
              title={t(`navbar.${key}`)}
              description={t(`sections.items.${key}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
