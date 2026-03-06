import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: "/finai-web",
  assetPrefix: "/finai-web",
};

export default nextConfig;
