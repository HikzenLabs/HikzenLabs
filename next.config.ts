import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // BUILD.md §11 — every image is WebP through next/image.
  images: {
    formats: ["image/webp"],
  },
};

export default nextConfig;
