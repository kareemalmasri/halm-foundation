import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";

const TIMELINE_KEYS = ["y2016", "y2018", "y2020", "y2022", "y2024", "y2025"] as const;

export default function ArchiveTrainingPage() {
  const t = useTranslations();

  return (
    <main className="flex-1 bg-ink px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[
            { label: t("navbar.home"), href: "/" },
            { label: t("navbar.training"), href: "/training" },
            { label: t("training.links.archive") },
          ]}
        />

        <h1 className="mt-6 text-4xl font-bold text-gold">
          {t("training.archive.title")}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-white/70">
          {t("training.archive.intro")}
        </p>

        <ol className="mt-10 flex flex-col gap-6 border-s-2 border-gold/30 ps-6">
          {TIMELINE_KEYS.map((key) => (
            <li key={key}>
              <span className="text-sm font-semibold text-gold">
                {key.replace("y", "")}
              </span>
              <p className="mt-1 text-white/70">
                {t(`training.archive.timeline.${key}`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
