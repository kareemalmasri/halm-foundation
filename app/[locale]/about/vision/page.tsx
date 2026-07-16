import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import { TargetIcon } from "@/components/icons";

const GOAL_KEYS = ["goal1", "goal2", "goal3", "goal4"] as const;

export default function VisionPage() {
  const t = useTranslations();
  const tVision = useTranslations("about.vision");

  return (
    <main className="flex-1 bg-ink px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[
            { label: t("navbar.home"), href: "/" },
            { label: t("navbar.about"), href: "/about" },
            { label: t("about.links.vision") },
          ]}
        />

        <h1 className="mt-6 text-4xl font-bold text-gold">{tVision("title")}</h1>
        <p className="mt-6 text-lg leading-relaxed text-white/70">
          {tVision("intro")}
        </p>

        <ul className="mt-10 flex flex-col gap-4">
          {GOAL_KEYS.map((key) => (
            <li key={key} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold/15 text-gold">
                <TargetIcon className="h-3.5 w-3.5" />
              </span>
              <span className="text-lg leading-relaxed text-white/80">
                {tVision(`goals.${key}`)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
