import { useTranslations } from "next-intl";
import { UserIcon } from "@/components/icons";

const TEAM_MEMBER_KEYS = ["member1", "member2", "member3", "member4"] as const;

export default function TeamPage() {
  const t = useTranslations("about.team");

  return (
    <main className="flex-1 bg-ink px-6 py-20">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-bold text-gold">{t("title")}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
          {t("intro")}
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM_MEMBER_KEYS.map((key) => (
          <div
            key={key}
            className="flex flex-col items-center gap-3 rounded-lg bg-ivory p-6 text-center text-ink"
          >
            <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-gold">
              <UserIcon className="h-10 w-10" />
            </span>
            <h3 className="text-lg font-semibold text-ink">
              {t(`members.${key}.name`)}
            </h3>
            <p className="text-sm text-ink/60">{t(`members.${key}.role`)}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
