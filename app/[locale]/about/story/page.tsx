import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";

export default function StoryPage() {
  const t = useTranslations();
  const tStory = useTranslations("about.story");

  return (
    <main className="flex-1 bg-ink px-8 py-20">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[
            { label: t("navbar.home"), href: "/" },
            { label: t("navbar.about"), href: "/about" },
            { label: t("about.links.story") },
          ]}
        />

        <h1 className="mt-6 text-4xl font-bold text-gold">{tStory("title")}</h1>
        <div className="mt-8 flex flex-col gap-6">
          <p className="text-xl leading-relaxed text-white/70">
            {tStory("paragraph1")}
          </p>
          <p className="text-xl leading-relaxed text-white/70">
            {tStory("paragraph2")}
          </p>
        </div>
      </div>
    </main>
  );
}
