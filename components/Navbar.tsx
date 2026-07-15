import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { NAV_SECTIONS } from "@/components/nav-sections";

export default function Navbar() {
  const t = useTranslations();

  return (
    <header className="border-b border-gold/20 bg-ink">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        {/* الشعار (نص مؤقت بلا صورة) */}
        <Link
          href="/"
          className="text-xl font-bold text-gold transition-opacity hover:opacity-90"
        >
          {t("siteName")}
        </Link>

        {/* روابط الأقسام الستة — مراسٍ داخل الصفحة إلى البطاقات */}
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gold/80">
          {NAV_SECTIONS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="transition-colors hover:text-gold"
            >
              {t(`navbar.${key}`)}
            </a>
          ))}
        </nav>

        <LocaleSwitcher />
      </div>
    </header>
  );
}
