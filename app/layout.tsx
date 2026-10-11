import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProvedorMotion } from "@/components/motion/Provedor";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { default: `${site.nome} — sistemas, automações e sites`, template: `%s — ${site.nome}` },
  description: site.descricao,
  openGraph: { title: site.nome, description: site.descricao, locale: "pt_BR", type: "website" },
};

export const viewport: Viewport = { themeColor: "#f4f6f9", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={GeistSans.variable}>
      <body className="min-h-dvh overflow-x-hidden">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Pular para o conteúdo
        </a>
        <ProvedorMotion>
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
        </ProvedorMotion>
      </body>
    </html>
  );
}
