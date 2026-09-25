import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  output: "export"  // for static build, for faster site
};

export default nextConfig;
