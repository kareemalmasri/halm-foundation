import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";

const SPECIALTY_KEYS = ["s1", "s2", "s3", "s4", "s5"] as const;

export default function DamasceneTrainingPage() {
  const t = useTranslations();

  return (
    <main className="flex-1 bg-ink px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[
            { label: t("navbar.home"), href: "/" },
            { label: t("navbar.training"), href: "/training" },
            { label: t("training.links.damascene") },
          ]}
        />

        <h1 className="mt-6 text-4xl font-bold text-gold">
          {t("training.damascene.title")}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-white/70">
          {t("training.damascene.intro")}
        </p>

        <div className="mt-10 flex flex-col gap-4">
          {SPECIALTY_KEYS.map((key) => (
            <div key={key} className="rounded-lg bg-ivory p-5 text-ink">
              <h3 className="text-lg font-semibold text-ink">
                {t(`training.damascene.specialties.${key}.title`)}
              </h3>
              <p className="mt-1 text-ink/70">
                {t(`training.damascene.specialties.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
