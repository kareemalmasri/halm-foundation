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
  // صورة مصغّرة تُعرض على البطاقة حين يكون العنصر صورة/وثيقة
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
    // البطاقة بأكملها زرّ واحد — يجعل كامل مساحتها قابلة للضغط (لا زر منفصل)،
    // ويمنح مجاناً دعم لوحة المفاتيح (Enter/Space) ودلالات وصول صحيحة.
    <button
      type="button"
      onClick={(e) => onOpen(e.currentTarget)}
      aria-label={hasTitle ? `${openLabel}: ${title}` : openLabel}
      className="group flex h-full w-full cursor-pointer flex-col gap-4 overflow-hidden rounded-lg bg-ivory p-6 text-start text-ink transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:hover:translate-y-0"
    >
      {showThumb && (
        // loading="lazy" ضروري هنا: الشبكة قد تحوي مئات الصور بسنة واحدة،
        // فلا تُحمَّل إلا عند اقترابها من إطار العرض.
        <img
          src={thumbnailUrl as string}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setThumbFailed(true)}
          // عرض ممتدّ لحواف البطاقة: الهوامش السالبة تلغي حشوة p-6 والعرض يعوّضها.
          // max-w-none ضروري — preflight في Tailwind يضع max-width:100% على الصور،
          // فيقصّ الـcalc ويعيدها لعرض المحتوى. وفي calc تُكتب المسافات كشرطات سفلية.
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

      {/* العنوان/الوصف يُحذفان تماماً حين يكونان فارغين، فلا تبقى مساحة معلّقة */}
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
