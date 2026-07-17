import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative isolate overflow-hidden bg-ink px-6 py-24 sm:py-32">
      {/* صورة الخلفية — next/image بخاصية fill */}
      <Image
        src="/images/hero-background.png"
        alt=""
        fill
        sizes="100vw"
        preload
        style={{ objectFit: "cover", objectPosition: "center 35%" }}
        className="-z-10"
      />

      {/* طبقة تعتيم داكنة متدرّجة تتزايد نحو المنتصف والأسفل */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,20,16,0.30) 0%, rgba(26,20,16,0.65) 55%, rgba(26,20,16,0.92) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold leading-tight text-gold sm:text-5xl">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-xl leading-relaxed text-white/70">
          {t("description")}
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          {/* بلا وظيفة فعلية بعد — تصميم فقط */}
          <button
            type="button"
            className="rounded bg-gold px-6 py-3 font-semibold text-ink transition-opacity hover:opacity-90"
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
