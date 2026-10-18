import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

/**
 * Fonte de título via next/font: além de servir local (sem request a
 * terceiros), ela gera um fallback com métricas ajustadas. Sem isso, a
 * troca da fonte no h1 gigante empurrava a página inteira — era a maior
 * fonte de CLS que sobrou depois do canvas 3D.
 */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProvedorMotion } from "@/components/motion/Provedor";
import { ScrollSuave } from "@/components/motion/ScrollSuave";
import { Fundo } from "@/components/visual/Fundo";
import { GA4 } from "@/components/analytics/GA4";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { default: `${site.nome} — sistemas, automações e sites`, template: `%s — ${site.nome}` },
  description: site.descricao,
  openGraph: { title: site.nome, description: site.descricao, locale: "pt_BR", type: "website" },
};

export const viewport: Viewport = { themeColor: "#070b14", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${bricolage.variable}`}>
      <body className="min-h-dvh overflow-x-hidden">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-on-brand">
          Pular para o conteúdo
        </a>
        <ProvedorMotion>
          <ScrollSuave>
          <Fundo />
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          </ScrollSuave>
        </ProvedorMotion>
        <GA4 />
      </body>
    </html>
  );
}
