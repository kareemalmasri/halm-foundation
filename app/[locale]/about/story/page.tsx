import { useTranslations } from "next-intl";

export default function StoryPage() {
  const t = useTranslations("about.story");

  return (
    <main className="flex-1 bg-ink px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gold">{t("title")}</h1>
        <div className="mt-8 flex flex-col gap-6">
          <p className="text-lg leading-relaxed text-white/70">
            {t("paragraph1")}
          </p>
          <p className="text-lg leading-relaxed text-white/70">
            {t("paragraph2")}
          </p>
        </div>
      </div>
    </main>
  );
}
