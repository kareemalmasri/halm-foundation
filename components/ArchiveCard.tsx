"use client";

import type { ComponentType, SVGProps } from "react";

type ArchiveCardProps = {
  title: string;
  description?: string | null;
  typeLabel: string;
  eraLabel?: string | null;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  onOpen: (trigger: HTMLElement) => void;
  openLabel: string;
};

export default function ArchiveCard({
  title,
  description,
  typeLabel,
  eraLabel,
  Icon,
  onOpen,
  openLabel,
}: ArchiveCardProps) {
  return (
    // البطاقة بأكملها زرّ واحد — يجعل كامل مساحتها قابلة للضغط (لا زر منفصل)،
    // ويمنح مجاناً دعم لوحة المفاتيح (Enter/Space) ودلالات وصول صحيحة.
    <button
      type="button"
      onClick={(e) => onOpen(e.currentTarget)}
      aria-label={`${openLabel}: ${title}`}
      className="group flex h-full w-full cursor-pointer flex-col gap-4 rounded-lg bg-ivory p-6 text-start text-ink transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:hover:translate-y-0"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold transition-colors duration-300 group-hover:bg-gold/25">
          <Icon className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink/70">
          {typeLabel}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-ink">{title}</h3>

      {description && (
        <p className="text-sm leading-relaxed text-ink/70">{description}</p>
      )}

      {eraLabel && (
        <span className="mt-auto text-xs font-medium text-gold">{eraLabel}</span>
      )}
    </button>
  );
}
