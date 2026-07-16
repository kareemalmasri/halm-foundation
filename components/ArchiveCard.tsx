import type { ComponentType, SVGProps } from "react";

type ArchiveCardProps = {
  title: string;
  description?: string | null;
  typeLabel: string;
  eraLabel?: string | null;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export default function ArchiveCard({
  title,
  description,
  typeLabel,
  eraLabel,
  Icon,
}: ArchiveCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-lg bg-ivory p-6 text-ink">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
          <Icon className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink/70">
          {typeLabel}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-ink">{title}</h3>

      {description && (
        <p className="text-sm leading-relaxed text-ink/70">{description}</p>
      )}

      {eraLabel && (
        <span className="mt-auto text-xs font-medium text-gold">{eraLabel}</span>
      )}
    </article>
  );
}
