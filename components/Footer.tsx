import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gold/20 bg-navy px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center">
        <span className="text-lg font-bold text-gold">{t("siteName")}</span>
        <p className="text-sm text-white/60">
          © {year} {t("siteName")} — {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
