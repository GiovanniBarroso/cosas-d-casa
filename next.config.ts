import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "via.placeholder.com" },
      // si luego usas placehold.co u otros, añádelos aquí
      // { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;
