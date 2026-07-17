import { useTranslations } from "next-intl";
import CardLink from "@/components/CardLink";
import { ScrollIcon, UsersIcon, TargetIcon } from "@/components/icons";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <main className="flex-1 bg-ink px-8 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-gold sm:text-5xl">
          {t("hero.title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white/70">
          {t("hero.summary")}
        </p>
      </div>

      <div className="mx-auto mt-16 flex max-w-4xl flex-wrap justify-center gap-6">
        <CardLink
          href="/about/story"
          Icon={ScrollIcon}
          title={t("links.story")}
          description={t("links.storyDescription")}
        />
        <CardLink
          href="/about/team"
          Icon={UsersIcon}
          title={t("links.team")}
          description={t("links.teamDescription")}
        />
        <CardLink
          href="/about/vision"
          Icon={TargetIcon}
          title={t("links.vision")}
          description={t("links.visionDescription")}
        />
      </div>
    </main>
  );
}
