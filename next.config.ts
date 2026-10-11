import type { NextConfig } from "next";

// Site 100% estático: `npm run build` gera a pasta `out/`,
// que sobe em qualquer hospedagem (Hostinger, GitHub Pages...).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
