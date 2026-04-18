import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shopnimai.in",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;