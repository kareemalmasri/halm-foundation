import { useTranslations } from "next-intl";
import CardLink from "@/components/CardLink";
import { ChiselIcon, KnotIcon, ArchiveIcon, TargetIcon } from "@/components/icons";

export default function TrainingPage() {
  const t = useTranslations("training");

  return (
    <main className="flex-1 bg-ink px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-gold sm:text-5xl">
          {t("hero.title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          {t("hero.summary")}
        </p>
      </div>

      <div className="mx-auto mt-16 flex max-w-4xl flex-wrap justify-center gap-6">
        <CardLink
          href="/training/damascene"
          Icon={ChiselIcon}
          title={t("links.damascene")}
          description={t("links.damasceneDescription")}
        />
        <CardLink
          href="/training/armenian"
          Icon={KnotIcon}
          title={t("links.armenian")}
          description={t("links.armenianDescription")}
        />
        <CardLink
          href="/training/archive"
          Icon={ArchiveIcon}
          title={t("links.archive")}
          description={t("links.archiveDescription")}
        />
        <CardLink
          href="/training/2026"
          Icon={TargetIcon}
          title={t("links.current")}
          description={t("links.currentDescription")}
        />
      </div>
    </main>
  );
}
