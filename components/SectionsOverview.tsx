import { useTranslations } from "next-intl";
import { OVERVIEW_SECTIONS, SECTION_HREFS } from "@/components/nav-sections";
import { SECTION_ICONS } from "@/components/icons";
import CardLink from "@/components/CardLink";

export default function SectionsOverview() {
  const t = useTranslations();

  const renderCard = (key: (typeof OVERVIEW_SECTIONS)[number], duplicate = false) => (
    <CardLink
      key={duplicate ? `${key}-duplicate` : key}
      id={duplicate ? undefined : key}
      href={SECTION_HREFS[key]}
      Icon={SECTION_ICONS[key]}
      title={t(`navbar.${key}`)}
      description={t(`sections.items.${key}.description`)}
      variant="marquee"
      duplicate={duplicate}
    />
  );

  return (
    <section className="bg-ink px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-gold">
          {t("sections.heading")}
        </h2>
      </div>

      <div className="marquee-viewport overflow-hidden">
        <div className="marquee-track flex flex-col gap-6 sm:w-max sm:flex-row sm:gap-0">
          {OVERVIEW_SECTIONS.map((key) => renderCard(key))}
          {/* Second pass is decorative only: hidden from assistive tech and
              skipped by Tab, so the loop never duplicates real navigation. */}
          {OVERVIEW_SECTIONS.map((key) => renderCard(key, true))}
        </div>
      </div>
    </section>
  );
}
