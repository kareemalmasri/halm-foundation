"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  PlayIcon,
  PauseIcon,
  VolumeIcon,
  MutedIcon,
  FullscreenIcon,
  ExitFullscreenIcon,
} from "@/components/icons";

type Quality = "sd" | "hd";

type VideoPlayerProps = {
  src: string;
  srcHd?: string | null;
  poster?: string;
  title: string;
};

// ثوانٍ -> m:ss (أو h:mm:ss للمقاطع الطويلة)
function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  return `${h > 0 ? `${h}:` : ""}${mm}:${String(s).padStart(2, "0")}`;
}

// زر تحكّم موحّد — مساحة لمس ≥44px على الجوال كما تتطلّب إرشادات اللمس
const CTRL =
  "flex h-11 w-11 flex-none items-center justify-center rounded-full text-ivory transition-colors hover:bg-ivory/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export default function VideoPlayer({
  src,
  srcHd,
  poster,
  title,
}: VideoPlayerProps) {
  const t = useTranslations("memoryBank.viewer");
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const hasHd = Boolean(srcHd);
  const [quality, setQuality] = useState<Quality>("sd");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [failed, setFailed] = useState(false);
  // بعد أول تشغيل نسمح بجلب البيانات الوصفية تلقائياً، ليعمل تبديل الجودة
  // فوراً دون انتظار ضغطة تشغيل جديدة. قبل ذلك preload="none" (لا تحميل بلا طلب).
  const [primed, setPrimed] = useState(false);

  // عند تبديل الجودة يُعاد تحميل المصدر، فنحفظ الموضع وحالة التشغيل لاستعادتهما
  const restoreRef = useRef<{ time: number; play: boolean } | null>(null);

  const activeSrc = quality === "hd" && srcHd ? srcHd : src;

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play().catch(() => setFailed(true));
    } else {
      v.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const next = Number(e.target.value);
    v.currentTime = next;
    setCurrent(next);
  };

  const onVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const next = Number(e.target.value);
    v.volume = next;
    v.muted = next === 0;
    setVolume(next);
    setMuted(next === 0);
  };

  const changeQuality = (next: Quality) => {
    const v = videoRef.current;
    if (!v || next === quality) return;
    // الحفاظ على تجربة متصلة: نفس اللحظة الزمنية ونفس حالة التشغيل بعد التبديل
    restoreRef.current = { time: v.currentTime, play: !v.paused };
    setQuality(next);
  };

  const toggleFullscreen = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {});
    } else {
      void el.requestFullscreen().catch(() => {});
    }
  }, []);

  // ——— استئناف التشغيل بعد تبديل الجودة ———
  // تغيير src يعيد ضبط العنصر، فنعيد تحميله ثم نستعيد اللحظة الزمنية وحالة التشغيل
  // فور توفّر البيانات الوصفية — فيبدو التبديل متصلاً بلا انقطاع أو رجوع للبداية.
  useEffect(() => {
    const v = videoRef.current;
    const restore = restoreRef.current;
    if (!v || !restore) return;

    v.load();
    const onMeta = () => {
      v.currentTime = restore.time;
      if (restore.play) void v.play().catch(() => {});
      restoreRef.current = null;
    };
    v.addEventListener("loadedmetadata", onMeta, { once: true });
    // play() يفرض التحميل بنفسه، فيضمن وصول loadedmetadata حتى لو تجاهل المتصفح load()
    if (restore.play) void v.play().catch(() => {});

    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, [activeSrc]);

  // مزامنة حالة ملء الشاشة مع تغييرات المتصفح (بما فيها زر Esc الخاص به)
  useEffect(() => {
    const onFsChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // إيقاف التشغيل عند إزالة المكوّن (إغلاق النافذة) حتى لا يستمر الصوت بالخلفية.
  // نكتفي بـpause(): إزالة العنصر من DOM توقف التحميل أصلاً، بينما removeAttribute("src")
  // هنا تُفسد المصدر فعلياً — لأن React في وضع Strict (بيئة التطوير) يشغّل الأثر مرتين
  // على نفس عقدة DOM، فتُحذف الخاصية ولا يعيد React ضبطها (لا تغيّر في شجرته الافتراضية).
  useEffect(() => {
    const v = videoRef.current;
    return () => {
      v?.pause();
    };
  }, []);

  if (failed) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-gold/30 bg-ink/60 p-6 text-center">
        <p className="text-white/70">{t("mediaError")}</p>
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden rounded-lg bg-black"
    >
      {/* نسبة 16:9 ثابتة تمنع أي قفزة تخطيط أو تشويه للنسبة على أي عرض شاشة */}
      <video
        ref={videoRef}
        src={activeSrc}
        poster={poster}
        title={title}
        preload={primed ? "metadata" : "none"}
        playsInline
        className="aspect-video w-full bg-black"
        onClick={togglePlay}
        onPlay={() => {
          setPlaying(true);
          setPrimed(true);
        }}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onError={() => setFailed(true)}
        onLoadedMetadata={(e) => {
          const v = e.currentTarget;
          setDuration(v.duration);
          const restore = restoreRef.current;
          if (restore) {
            v.currentTime = restore.time;
            if (restore.play) void v.play().catch(() => {});
            restoreRef.current = null;
          }
        }}
      />

      {/*
        شريط التحكّم — dir="ltr" مثبّت عمداً حتى بالعربية: المحور الزمني للفيديو
        يُقرأ يساراً->يميناً في كل واجهات التشغيل العالمية، فعكسه مع اتجاه الصفحة
        يربك المستخدم. النصوص داخله أرقام ورموز فقط فلا يتأثر المحتوى العربي.
      */}
      <div
        dir="ltr"
        className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-x-1 gap-y-2 bg-gradient-to-t from-black/85 via-black/60 to-transparent px-2 pb-2 pt-8 sm:px-3"
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? t("pause") : t("play")}
          className={CTRL}
        >
          {playing ? (
            <PauseIcon className="h-5 w-5" />
          ) : (
            <PlayIcon className="h-5 w-5" />
          )}
        </button>

        <span className="flex-none tabular-nums text-xs text-ivory/90">
          {formatTime(current)} / {formatTime(duration)}
        </span>

        {/* شريط التقدّم — يأخذ المساحة المتبقية، وينزل لسطر كامل على الشاشات الضيقة */}
        {/*
          max يعود إلى 1 قبل معرفة المدّة (preload="none" لا يجلب البيانات الوصفية):
          بـ0 يصبح المدى منعدماً فينكمش الشريط إلى حجم مؤشّره فقط.
          basis-full يمنحه سطراً كاملاً على الجوال — flex-1 وحده (أساس 0) يجعله ينكمش.
        */}
        <input
          type="range"
          min={0}
          max={duration || 1}
          step={0.1}
          value={current}
          onChange={onSeek}
          aria-label={t("seek")}
          className="order-last h-11 w-full min-w-0 basis-full cursor-pointer accent-gold sm:order-none sm:w-auto sm:flex-1 sm:basis-0"
        />

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? t("unmute") : t("mute")}
          className={CTRL}
        >
          {muted ? (
            <MutedIcon className="h-5 w-5" />
          ) : (
            <VolumeIcon className="h-5 w-5" />
          )}
        </button>

        {/* مستوى الصوت — يُخفى على الجوال (لا فائدة له مع أزرار الجهاز الفيزيائية) */}
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={muted ? 0 : volume}
          onChange={onVolume}
          aria-label={t("volume")}
          className="hidden h-11 w-20 cursor-pointer accent-gold sm:block"
        />

        {hasHd && (
          <div
            className="flex flex-none items-center overflow-hidden rounded-full border border-ivory/25"
            role="group"
            aria-label={t("quality")}
          >
            {(["sd", "hd"] as const).map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => changeQuality(q)}
                aria-pressed={quality === q}
                title={q === "hd" ? t("qualityHd") : t("qualitySd")}
                className={`h-11 min-w-[44px] px-3 text-xs font-semibold transition-colors ${
                  quality === q
                    ? "bg-gold text-ink"
                    : "text-ivory/85 hover:bg-ivory/15"
                }`}
              >
                {q === "hd" ? "HD" : "SD"}
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={fullscreen ? t("exitFullscreen") : t("fullscreen")}
          className={CTRL}
        >
          {fullscreen ? (
            <ExitFullscreenIcon className="h-5 w-5" />
          ) : (
            <FullscreenIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}
