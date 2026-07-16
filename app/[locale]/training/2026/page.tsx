import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb";
import { DownloadIcon } from "@/components/icons";

const COMPONENT_KEYS = ["c1", "c2", "c3", "c4"] as const;

export default function CurrentProgramPage() {
  const t = useTranslations();

  return (
    <main className="flex-1 bg-ink px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Breadcrumb
          items={[
            { label: t("navbar.home"), href: "/" },
            { label: t("navbar.training"), href: "/training" },
            { label: t("training.links.current") },
          ]}
        />

        <h1 className="mt-6 text-4xl font-bold text-gold">
          {t("training.current.title")}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-white/70">
          {t("training.current.description")}
        </p>

        <h2 className="mt-10 text-2xl font-semibold text-gold">
          {t("training.current.componentsTitle")}
        </h2>
        <ul className="mt-6 flex flex-col gap-4">
          {COMPONENT_KEYS.map((key) => (
            <li key={key} className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gold/15 text-gold">
                <span className="text-xs font-semibold">
                  {COMPONENT_KEYS.indexOf(key) + 1}
                </span>
              </span>
              <span className="text-lg leading-relaxed text-white/80">
                {t(`training.current.components.${key}`)}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="mt-12 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-ink transition-opacity hover:opacity-90"
        >
          <DownloadIcon className="h-5 w-5" />
          {t("training.current.download")}
        </button>
      </div>
    </main>
  );
}
