import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher";

const NAV_KEYS = [
  "home",
  "about",
  "training",
  "memory",
  "news",
  "contact",
] as const;

export default function HomePage() {
  const t = useTranslations("navbar");

  return (
    <main className="min-h-screen bg-navy flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold text-gold">حلم دمشقي</h1>
      <nav className="flex flex-wrap justify-center gap-4 text-gold/80">
        {NAV_KEYS.map((key) => (
          <span key={key}>{t(key)}</span>
        ))}
      </nav>
      <LocaleSwitcher />
    </main>
  );
}
