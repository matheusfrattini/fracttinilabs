import type { Metadata } from "next";
import { tipoPorSlug } from "@/content/tipos";
import { PaginaTipo } from "@/components/sections/PaginaTipo";

const tipo = tipoPorSlug("aplicativos")!;

export const metadata: Metadata = {
  title: tipo.heroTitulo,
  description: tipo.heroTexto,
};

export default function Pagina() {
  return <PaginaTipo tipo={tipo} />;
}
