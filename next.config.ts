import type { NextConfig } from "next";
import { execSync } from "node:child_process";

function buildHash(): string {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "dev";
  }
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_HASH: buildHash(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/VoidCU/**',
      },
    ],
  },
};

export default nextConfig;
