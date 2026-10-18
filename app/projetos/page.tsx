import type { Metadata } from "next";
import { projetos } from "@/content/projetos";
import { visiveis, emDev } from "@/lib/publicar";
import { ListaProjetos } from "@/components/sections/ListaProjetos";
import { ChamadaFinal } from "@/components/sections/ChamadaFinal";
import { Maquina } from "@/components/motion/Maquina";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Sistemas, automações e sites que a fracttini.labs construiu para negócios de Campinas e região.",
};

export default function Projetos() {
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-20 sm:px-6 md:pt-28 md:pb-28">
        <header className="mb-14 md:mb-20">
          <h1 className="titulo-heroi">Projetos</h1>
          <Maquina
            texto="Cada caso mostra o problema que o cliente tinha e o que a gente construiu pra resolver. Toque em um projeto pra ver os detalhes."
            className="texto-leitura mt-7 text-[17px] leading-relaxed text-muted sm:text-lg"
          />
        </header>
        <ListaProjetos projetos={visiveis(projetos)} mostrarRascunho={emDev} />
      </section>
      <ChamadaFinal />
    </>
  );
}
