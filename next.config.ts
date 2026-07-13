import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  ...(isVercel
    ? {}
    : {
        output: "standalone",
       
      }),
  reactStrictMode: !isProd,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  productionBrowserSourceMaps: false,
  httpAgentOptions: {
    keepAlive: true,
  },

  // Compiler options
  compiler: {
    removeConsole: isProd,
    reactRemoveProperties: isProd,
  },

  // Image configuration
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    unoptimized: !isVercel,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tiles.stadiamaps.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
