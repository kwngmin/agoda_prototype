import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.agoda.net",
      },
      {
        protocol: "https",
        hostname: "*.agoda.com",
      },
      {
        protocol: "https",
        hostname: "*.bstatic.com",
      },
      {
        protocol: "https",
        hostname: "q-xx.bstatic.com",
      },
      {
        protocol: "https",
        hostname: "agoda.net",
      },
      {
        protocol: "https",
        hostname: "agoda.com",
      },
      {
        protocol: "https",
        hostname: "bstatic.com",
      },
    ],
  },
};

export default nextConfig;
