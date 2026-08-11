"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { XIcon, ARCHIVE_TYPE_ICONS, DocumentIcon } from "@/components/icons";
import VideoPlayer from "@/components/VideoPlayer";

export type ArchiveMediaItem = {
  id: string;
  type: string;
  title: string;
  typeLabel: string;
  eraLabel?: string | null;
  fileUrl: string;
  fileUrlHd?: string | null;
};

type ArchiveModalProps = {
  item: ArchiveMediaItem;
  onClose: () => void;
};

// الأنواع التي تُعرض كصورة (الوثيقة مسح ضوئي، فتُعامل معاملة الصورة)
const IMAGE_TYPES = new Set(["photo", "document"]);
const VIDEO_POSTER = "/archive/craft-poster.jpg";

export default function ArchiveModal({ item, onClose }: ArchiveModalProps) {
  const t = useTranslations("memoryBank.viewer");
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const [mounted, setMounted] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const isImage = IMAGE_TYPES.has(item.type);
  const isVideo = item.type === "video";
  const isAudio = item.type === "audio";
  const Icon = ARCHIVE_TYPE_ICONS[item.type] ?? DocumentIcon;

  useEffect(() => setMounted(true), []);

  // ——— أنيميشن القلب ———
  // نحمّل الصورة أولاً ثم نقلب، حتى لا ينكشف وجه فارغ في منتصف الدوران.
  // ومع تفضيل تقليل الحركة (prefers-reduced-motion) نتخطّى الدوران فوراً.
  useEffect(() => {
    if (!isImage) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const img = new window.Image();
    let cancelled = false;
    let raf = 0;

    img.onload = () => {
      if (cancelled) return;
      if (reduced) {
        setFlipped(true);
        return;
      }
      // إطارين متتاليين: يضمنان أن المتصفح رسم الوجه الأمامي قبل بدء الانتقال،
      // وإلا قفز العنصر للحالة النهائية بلا حركة.
      raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => !cancelled && setFlipped(true))
      );
    };
    img.onerror = () => {
      if (cancelled) return;
      setImageFailed(true);
      setFlipped(true);
    };
    img.src = item.fileUrl;

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [isImage, item.fileUrl]);

  // ——— إغلاق بمفتاح Escape + حصر التنقّل بلوحة المفاتيح داخل النافذة ———
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, video, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // ——— قفل تمرير الصفحة خلف النافذة، مع تعويض عرض شريط التمرير ———
  // بدون التعويض يقفز عرض الصفحة أفقياً لحظة الفتح على سطح المكتب.
  useEffect(() => {
    const { body, documentElement } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingInlineEnd;
    const gap = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingInlineEnd = `${gap}px`;

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingInlineEnd = prevPadding;
    };
  }, []);

  // نقل التركيز إلى زر الإغلاق عند الفتح، وإعادته لعنصر الاستدعاء يتكفّل به الأب.
  // يعتمد على mounted لا على [] فقط: قبل التركيب لا تكون البوّابة (portal) قد رُسمت
  // بعد، فيكون closeRef فارغاً ولا يحدث تركيز إطلاقاً.
  useEffect(() => {
    if (mounted) closeRef.current?.focus();
  }, [mounted]);

  const onBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overscroll-contain bg-ink/85 p-4 backdrop-blur-sm sm:p-6"
      onClick={onBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div ref={panelRef} className="my-auto w-full max-w-4xl">
        {/* رأس النافذة: العنوان + زر الإغلاق */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="text-2xl font-bold leading-snug text-gold sm:text-3xl"
            >
              {item.title}
            </h2>
            <p className="mt-1 text-sm text-white/60">
              {item.typeLabel}
              {item.eraLabel ? ` · ${item.eraLabel}` : ""}
            </p>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {/* ——— صورة/وثيقة: دوران ثلاثي الأبعاد 180° حول المحور Y ——— */}
        {isImage && (
          <div className="[perspective:1600px]">
            <div
              className="relative transition-transform duration-[520ms] ease-in-out [transform-style:preserve-3d] motion-reduce:transition-none"
              style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
            >
              {/* الوجه الأمامي — يحاكي هيئة البطاقة نفسها فيبدو أنها هي التي انقلبت */}
              <div className="flex aspect-[3/2] w-full flex-col items-center justify-center gap-4 rounded-lg bg-ivory p-6 text-ink [backface-visibility:hidden]">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Icon className="h-8 w-8" />
                </span>
                <span className="text-center text-lg font-semibold">
                  {item.title}
                </span>
              </div>

              {/* الوجه الخلفي — الصورة، مقلوبة مسبقاً 180° لتظهر معتدلة بعد الدوران */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                {imageFailed ? (
                  <div className="flex h-full w-full items-center justify-center rounded-lg border border-gold/30 bg-ink/60 p-6 text-center">
                    <p className="text-white/70">{t("imageError")}</p>
                  </div>
                ) : (
                  <img
                    src={item.fileUrl}
                    alt={item.title}
                    decoding="async"
                    onError={() => setImageFailed(true)}
                    className="h-full w-full rounded-lg object-contain"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* ——— فيديو: بلا دوران، ظهور متدرّج فقط ——— */}
        {isVideo && (
          <div className="animate-[fadeIn_320ms_ease-out] motion-reduce:animate-none">
            <VideoPlayer
              src={item.fileUrl}
              srcHd={item.fileUrlHd}
              poster={VIDEO_POSTER}
              title={item.title}
            />
          </div>
        )}

        {/* ——— صوت ——— */}
        {isAudio && (
          <div className="flex flex-col items-center gap-6 rounded-lg bg-ivory p-8">
            <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Icon className="h-10 w-10" />
            </span>
            <audio
              controls
              preload="none"
              src={item.fileUrl}
              className="w-full max-w-md"
            />
          </div>
        )}

        {/* نوع غير معروف — حالة بديلة أنيقة بدل واجهة مكسورة */}
        {!isImage && !isVideo && !isAudio && (
          <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-gold/30 bg-ink/60 p-6 text-center">
            <p className="text-white/70">{t("noPreview")}</p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
