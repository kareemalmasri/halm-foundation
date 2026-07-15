import { useTranslations } from "next-intl";
import { FacebookIcon, InstagramIcon, XIcon } from "@/components/icons";

const SOCIAL_PLATFORMS = [
  { key: "facebook", Icon: FacebookIcon },
  { key: "instagram", Icon: InstagramIcon },
  { key: "twitter", Icon: XIcon },
] as const;

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gold/20 bg-ink px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <span className="text-lg font-bold text-gold">{t("siteName")}</span>

        <div className="flex items-center justify-center gap-4">
          {SOCIAL_PLATFORMS.map(({ key, Icon }) => (
            <button
              key={key}
              type="button"
              // بلا وظيفة فعلية بعد — تصميم فقط، نفس نمط أزرار Hero
              aria-label={t(`footer.social.${key}`)}
              className="text-ivory/70 transition-colors hover:text-gold"
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>

        <p className="text-sm text-white/60">
          © {year} {t("siteName")} — {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
