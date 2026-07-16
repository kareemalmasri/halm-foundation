import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import { UserIcon } from "@/components/icons";

const TEAM_MEMBER_KEYS = ["member1", "member2", "member3", "member4"] as const;

export default function TeamPage() {
  const t = useTranslations();
  const tTeam = useTranslations("about.team");

  return (
    <main className="flex-1 bg-ink px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb
          items={[
            { label: t("navbar.home"), href: "/" },
            { label: t("navbar.about"), href: "/about" },
            { label: t("about.links.team") },
          ]}
        />
      </div>

      <div className="mx-auto mt-6 max-w-5xl text-center">
        <h1 className="text-4xl font-bold text-gold">{tTeam("title")}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
          {tTeam("intro")}
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
              {tTeam(`members.${key}.name`)}
            </h3>
            <p className="text-sm text-ink/60">{tTeam(`members.${key}.role`)}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
