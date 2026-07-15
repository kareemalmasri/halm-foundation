import { useTranslations } from "next-intl";
import { NAV_SECTIONS } from "@/components/nav-sections";

export default function SectionsOverview() {
  const t = useTranslations();

  return (
    <section className="bg-ink px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-gold">
          {t("sections.heading")}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {NAV_SECTIONS.map((key) => (
            <article
              key={key}
              id={key}
              className="scroll-mt-24 rounded-lg border border-gold/30 bg-white/5 p-6 transition-colors hover:border-gold"
            >
              <h3 className="mb-3 text-xl font-semibold text-gold">
                {t(`navbar.${key}`)}
              </h3>
              <p className="leading-relaxed text-white/70">
                {t(`sections.items.${key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
