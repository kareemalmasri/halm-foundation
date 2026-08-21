"use client";

import { useState } from "react";
import type { ComponentType, SVGProps } from "react";

type ArchiveCardProps = {
  title: string;
  description?: string | null;
  typeLabel: string;
  yearLabel?: string | null;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  onOpen: (trigger: HTMLElement) => void;
  openLabel: string;
  thumbnailUrl?: string | null;
};

export default function ArchiveCard({
  title,
  description,
  typeLabel,
  yearLabel,
  Icon,
  onOpen,
  openLabel,
  thumbnailUrl,
}: ArchiveCardProps) {
  const [thumbFailed, setThumbFailed] = useState(false);

  const hasTitle = title.trim().length > 0;
  const hasDescription = Boolean(description && description.trim().length > 0);
  const showThumb = Boolean(thumbnailUrl) && !thumbFailed;

  return (
    <button
      type="button"
      onClick={(e) => onOpen(e.currentTarget)}
      aria-label={hasTitle ? `${openLabel}: ${title}` : openLabel}
      className="group flex h-full w-full cursor-pointer flex-col gap-4 overflow-hidden rounded-lg bg-ivory p-6 text-start text-ink transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:hover:translate-y-0"
    >
      {showThumb && (
        <img
          src={thumbnailUrl as string}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setThumbFailed(true)}
          className="-mx-6 -mt-6 aspect-[4/3] w-[calc(100%_+_3rem)] max-w-none object-cover"
        />
      )}

      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold transition-colors duration-300 group-hover:bg-gold/25">
          <Icon className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink/70">
          {typeLabel}
        </span>
      </div>

      {hasTitle && <h3 className="text-xl font-semibold text-ink">{title}</h3>}

      {hasDescription && (
        <p className="text-sm leading-relaxed text-ink/70">{description}</p>
      )}

      {yearLabel && (
        <span className="mt-auto text-xs font-medium text-gold">
          {yearLabel}
        </span>
      )}
    </button>
  );
}
