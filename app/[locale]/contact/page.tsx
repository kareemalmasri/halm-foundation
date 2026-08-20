import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const t = useTranslations();

  return (
    <main className="flex-1 bg-ink px-8 py-20">
      <div className="mx-auto max-w-2xl">
        <Breadcrumb
          items={[
            { label: t("navbar.home"), href: "/" },
            { label: t("navbar.contact") },
          ]}
        />

        <div className="mt-6 text-center">
          <h1 className="text-4xl font-bold text-gold sm:text-5xl">
            {t("contact.hero.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-white/70">
            {t("contact.hero.summary")}
          </p>
        </div>

        <div className="mt-12">
          <ContactForm />
        </div>

        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-gold">
            {t("contact.map.heading")}
          </h2>
          {/*
            Google Maps Embed (بلا مفتاح API) — رابط q=lat,lng&output=embed مباشر
            عبر iframe بسيط، بلا أي مكتبة JS خارجية أو تكلفة.
          */}
          <iframe
            src="https://www.google.com/maps?q=33.509833,36.318972&output=embed"
            title={t("contact.map.iframeTitle")}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[250px] w-full rounded-lg border border-gold/20 sm:h-[400px]"
          />
        </div>
      </div>
    </main>
  );
}
