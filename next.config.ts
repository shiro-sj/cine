import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'external-content.duckduckgo.com', // Add this line
      // other domains if necessary
    ],
  },
};

export default nextConfig;
