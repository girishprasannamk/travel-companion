import type { NextConfig } from "next";

/**
 * Static-export configuration.
 *
 * `output: "export"` produces a fully static `out/` directory — no server
 * runtime — which is what GitHub Pages (and Vercel/Firebase Hosting) serve.
 *
 * `PAGES_BASE_PATH` is set only in the GitHub Actions build so the app is
 * mounted under /travel-companion on the project site. Left empty locally and
 * on Vercel/Firebase, so the SAME code deploys everywhere with no changes
 * (per the bootstrap spec: "without changing application code").
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    // Static export has no image optimization server.
    unoptimized: true,
  },
};

export default nextConfig;
