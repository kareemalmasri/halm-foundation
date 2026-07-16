import { useTranslations } from "next-intl";
import { TargetIcon } from "@/components/icons";

const GOAL_KEYS = ["goal1", "goal2", "goal3", "goal4"] as const;

export default function VisionPage() {
  const t = useTranslations("about.vision");

  return (
    <main className="flex-1 bg-ink px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-gold">{t("title")}</h1>
        <p className="mt-6 text-lg leading-relaxed text-white/70">
          {t("intro")}
        </p>

        <ul className="mt-10 flex flex-col gap-4">
          {GOAL_KEYS.map((key) => (
            <li key={key} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold/15 text-gold">
                <TargetIcon className="h-3.5 w-3.5" />
              </span>
              <span className="text-lg leading-relaxed text-white/80">
                {t(`goals.${key}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
