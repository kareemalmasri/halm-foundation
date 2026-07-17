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
      </div>
    </main>
  );
}
