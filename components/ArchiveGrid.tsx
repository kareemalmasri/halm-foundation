"use client";

import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import ArchiveCard from "@/components/ArchiveCard";
import ArchiveModal, { type ArchiveMediaItem } from "@/components/ArchiveModal";
import { ARCHIVE_TYPE_ICONS, DocumentIcon } from "@/components/icons";

type ArchiveGridItem = ArchiveMediaItem & {
  description?: string | null;
};

// الأنواع التي ملفّها صورة، فتصلح مصغّرةً على البطاقة
const THUMBNAIL_TYPES = new Set(["photo", "document"]);

export default function ArchiveGrid({ items }: { items: ArchiveGridItem[] }) {
  const t = useTranslations("memoryBank.viewer");
  const [activeId, setActiveId] = useState<string | null>(null);
  // مرجع البطاقة التي فتحت النافذة — لإعادة التركيز إليها عند الإغلاق (وصولية)
  const triggerRef = useRef<HTMLElement | null>(null);

  const active = items.find((i) => i.id === activeId) ?? null;

  // نحتفظ بعنصر البطاقة نفسه (لا document.activeElement): النقر بالفأرة قد لا
  // ينقل التركيز إليها، فيضيع مرجع العودة عند الإغلاق.
  const open = useCallback((id: string, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setActiveId(id);
  }, []);

  const close = useCallback(() => {
    setActiveId(null);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = ARCHIVE_TYPE_ICONS[item.type] ?? DocumentIcon;
          return (
            <ArchiveCard
              key={item.id}
              Icon={Icon}
              title={item.title}
              description={item.description}
              typeLabel={item.typeLabel}
              yearLabel={item.yearLabel}
              thumbnailUrl={
                THUMBNAIL_TYPES.has(item.type)
                  ? // المصغّرة إن وُجدت، وإلا الصورة الكاملة (عناصر قديمة بلا مصغّرة)
                    (item.thumbnailUrl ?? item.fileUrl)
                  : null
              }
              openLabel={t("open")}
              onOpen={(trigger) => open(item.id, trigger)}
            />
          );
        })}
      </div>

      {/* نسخة واحدة فقط من النافذة، تُركَّب عند الفتح وتُفكَّك عند الإغلاق —
          فلا تُحمَّل أي وسائط قبل الطلب، ويتوقف الفيديو حتماً عند الإغلاق. */}
      {active && <ArchiveModal item={active} onClose={close} />}
    </>
  );
}
