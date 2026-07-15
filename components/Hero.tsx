import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="bg-navy px-6 py-24 sm:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold leading-tight text-gold sm:text-5xl">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-white/70">
          {t("description")}
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          {/* بلا وظيفة فعلية بعد — تصميم فقط */}
          <button
            type="button"
            className="rounded bg-gold px-6 py-3 font-semibold text-navy transition-opacity hover:opacity-90"
          >
            {t("ctaPrimary")}
          </button>
          <button
            type="button"
            className="rounded border border-gold px-6 py-3 font-semibold text-gold transition-colors hover:bg-gold/10"
          >
            {t("ctaSecondary")}
          </button>
        </div>
      </div>
    </section>
  );
}
