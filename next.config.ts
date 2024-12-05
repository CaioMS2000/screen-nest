import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      minimumCacheTTL: 60 * 1 * 60 * 24,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/**',
        port: '',
        search: ''
      },
    ],
  },
};

export default nextConfig;
