import path from "path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {
    turbopackFileSystemCacheForDev: false,
  },
};

export default withNextIntl(nextConfig);
