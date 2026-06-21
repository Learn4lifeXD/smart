import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/dossiers',
        destination: 'http://127.0.0.1:8001/api/v1/dossiers',
      },
      {
        source: '/api/v1/dossiers/:path*',
        destination: 'http://127.0.0.1:8001/api/v1/dossiers/:path*',
      },
      {
        source: '/api/v1/ai/:path*',
        destination: 'http://127.0.0.1:8004/api/v1/ai/:path*',
      },
    ];
  },
};

export default nextConfig;
