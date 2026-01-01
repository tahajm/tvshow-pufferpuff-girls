import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://static.tvmaze.com/uploads/images/**")],
  },
};

export default nextConfig;
