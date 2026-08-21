import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-ink px-6 py-16 sm:min-h-[640px] sm:py-20">
      <Image
        src="/images/hero-background.png"
        alt=""
        fill
        sizes="100vw"
        preload
        style={{ objectFit: "cover", objectPosition: "center 35%" }}
        className="-z-10"
      />

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,20,16,0.30) 0%, rgba(26,20,16,0.65) 55%, rgba(26,20,16,0.92) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-7 text-center sm:gap-8">
        <h1 className="text-5xl font-bold leading-tight text-gold sm:text-7xl">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-2xl leading-relaxed text-white/70">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
