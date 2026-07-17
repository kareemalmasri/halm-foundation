import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import NewsCard from "@/components/NewsCard";

const NEWS_ITEM_KEYS = [
  "item1",
  "item2",
  "item3",
  "item4",
  "item5",
  "item6",
] as const;

export default function NewsPage() {
  const t = useTranslations();
  const tNews = useTranslations("news");

  return (
    <main className="flex-1 bg-ink px-8 py-20">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[
            { label: t("navbar.home"), href: "/" },
            { label: t("navbar.news") },
          ]}
        />

        <div className="mt-6 text-center">
          <h1 className="text-4xl font-bold text-gold sm:text-5xl">
            {tNews("hero.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white/70">
            {tNews("hero.summary")}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-6">
          {NEWS_ITEM_KEYS.map((key) => (
            <NewsCard
              key={key}
              date={tNews(`items.${key}.date`)}
              title={tNews(`items.${key}.title`)}
              summary={tNews(`items.${key}.summary`)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
