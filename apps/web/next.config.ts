import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    serverActions: {
      allowedOrigins: [
        "127.0.0.1:3000",
        "localhost:3000",
        "stunning-zebra-4w9wr4rwg7xhjv5p-3000.app.github.dev",
      ],
    },
  },
};

export default nextConfig;
