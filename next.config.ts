import type { NextConfig } from "next";

/**
 * Site 100% estático: `npm run build` gera a pasta `out/`, que sobe em
 * qualquer hospedagem (GitHub Pages, Hostinger...).
 *
 * basePath/assetPrefix vêm de NEXT_PUBLIC_BASE_PATH, que o workflow do
 * GitHub Pages define como "/fracttinilabs" (o site fica num subcaminho,
 * não na raiz do domínio). Vazio em desenvolvimento e em hospedagem
 * própria, onde o site mora na raiz.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  transpilePackages: ["three"],
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
