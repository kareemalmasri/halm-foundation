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

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = h > 0 ? String(m).padStart(2, "0") : String(m);
  return `${h > 0 ? `${h}:` : ""}${mm}:${String(s).padStart(2, "0")}`;
}

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
  const [primed, setPrimed] = useState(false);

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
    if (restore.play) void v.play().catch(() => {});

    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, [activeSrc]);

  useEffect(() => {
    const onFsChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

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
