import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from any local public folder (no external domains needed)
  images: {
    // Local images only — all project/profile images are in /public/images/
    formats: ["image/webp", "image/avif"],
  },

  // Required for smooth output in Vercel deployments
  poweredByHeader: false,
};

export default nextConfig;
