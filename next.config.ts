import path from "path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // يحدّد جذر المشروع صراحة لتفادي تحذير "multiple lockfiles"
  // الناتج عن وجود package-lock.json آخر في C:\Users\Kareem
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {
    // معطّل: كاش نظام الملفات لـTurbopack بوضع dev (مفعّل افتراضياً منذ v16.1.0)
    // يسبّب أحياناً قراءة متزامنة لملف JSON بمنتصف كتابته (بعد إعادة تشغيل السيرفر
    // أو تعديل ملف)، فيفشل JSON.parse بخطأ "Unexpected end of JSON input" —
    // تعطيله يزيل هذا التسابق (race) على حساب سرعة إعادة الترجمة بين الجلسات فقط.
    turbopackFileSystemCacheForDev: false,
  },
};

export default withNextIntl(nextConfig);
