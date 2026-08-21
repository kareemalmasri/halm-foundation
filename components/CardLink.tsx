import type { ComponentType, SVGProps } from "react";
import { Link } from "@/i18n/navigation";

type CardLinkProps = {
  href: string;
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  id?: string;
  variant?: "grid" | "marquee";
  duplicate?: boolean;
};

const BASE = "scroll-mt-24 flex-none flex-col gap-4 rounded-lg bg-ivory p-6 text-ink";

// Grid cards (About/Training): the original lift + glow hover.
// Marquee cards (SectionsOverview): no movement at all — a transparent
// border baseline that turns gold on hover, so the border "appearing"
// never shifts layout (box-sizing: border-box keeps the box the same size
// whether the border is transparent or gold).
const HOVER = {
  grid: "transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/30 motion-reduce:hover:translate-y-0",
  marquee:
    "border-2 border-transparent transition-colors duration-200 hover:border-gold",
};

const LAYOUT = {
  grid: "flex w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]",
  marquee: "flex w-full sm:me-6 sm:w-[320px] lg:w-[360px]",
  marqueeDuplicate:
    "hidden w-full sm:me-6 sm:flex sm:w-[320px] lg:w-[360px]",
};

export default function CardLink({
  href,
  title,
  description,
  Icon,
  id,
  variant = "grid",
  duplicate = false,
}: CardLinkProps) {
  const layout =
    variant === "marquee"
      ? duplicate
        ? LAYOUT.marqueeDuplicate
        : LAYOUT.marquee
      : LAYOUT.grid;
  const hover = variant === "marquee" ? HOVER.marquee : HOVER.grid;

  return (
    <Link
      id={id}
      href={href}
      className={`${layout} ${BASE} ${hover}`}
      {...(duplicate ? { "aria-hidden": true, tabIndex: -1 } : {})}
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="text-xl font-semibold text-ink">{title}</h3>
      <p className="leading-relaxed text-ink/70">{description}</p>
    </Link>
  );
}
