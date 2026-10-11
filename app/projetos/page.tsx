import type { Metadata } from "next";
import { projetos } from "@/content/projetos";
import { visiveis, emDev } from "@/lib/publicar";
import { ListaProjetos } from "@/components/sections/ListaProjetos";
import { ChamadaFinal } from "@/components/sections/ChamadaFinal";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Sistemas, automações e sites que a fracttini.labs construiu para negócios de Campinas e região.",
};

export default function Projetos() {
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 pt-10 pb-16 sm:px-6 md:pt-16">
        <header className="mb-10 max-w-2xl">
          <h1 className="text-4xl sm:text-6xl">Projetos</h1>
          <p className="mt-4 text-lg text-muted">
            Cada caso mostra o problema que o cliente tinha e o que a gente construiu pra resolver. Toque em um projeto pra ver os detalhes.
          </p>
        </header>
        <ListaProjetos projetos={visiveis(projetos)} mostrarRascunho={emDev} />
      </section>
      <ChamadaFinal />
    </>
  );
}
