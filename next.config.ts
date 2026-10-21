
import type { NextConfig } from "next";

// GitHub Pages project repository path
const basePath = process.env.GITHUB_ACTIONS ? "/studioa-by-nancy" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Generate a static website for GitHub Pages
  output: "export",

  basePath,
  // exposed so string paths into /public can be prefixed (see `asset()`)
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  trailingSlash: true,

  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },

  experimental: {
    optimizePackageImports: ["framer-motion", "lenis"],
  },
};

export default nextConfig;
