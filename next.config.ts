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
};

export default withNextIntl(nextConfig);
