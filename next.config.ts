import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "stunning-zebra-4w9wr4rwg7xhjv5p-3000.app.github.dev",
      ],
    },
  },
};

export default nextConfig;
