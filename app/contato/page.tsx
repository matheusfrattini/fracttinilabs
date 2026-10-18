import type { Metadata } from "next";
import { FormContato } from "@/components/sections/FormContato";
import { Perguntas } from "@/components/sections/Perguntas";
import { site } from "@/content/site";
import { Maquina } from "@/components/motion/Maquina";

export const metadata: Metadata = {
  title: "Contato",
  description: "Conta pra gente onde o seu negócio trava. A primeira conversa é pra entender o problema.",
};

export default function Contato() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-14 px-4 pt-16 pb-28 sm:px-6 md:grid-cols-[1fr_1.1fr] md:gap-20 md:pt-28">
      <div>
        <h1 className="titulo-heroi">Nos conta o problema</h1>
        <Maquina
          texto="Não precisa saber o que você quer contratar. Conta onde o negócio trava e a gente volta com uma proposta do tamanho certo."
          className="texto-leitura mt-7 text-[17px] leading-relaxed text-muted sm:text-lg"
        />
        <p className="mt-7 text-muted">
          Atendemos {site.cidade}, presencialmente ou à distância.
        </p>
        <div className="mt-12 hidden md:block">
          <Perguntas />
        </div>
      </div>
      <div>
        <FormContato />
        <div className="mt-12 md:hidden">
          <Perguntas />
        </div>
      </div>
    </section>
  );
}
