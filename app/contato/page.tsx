import type { Metadata } from "next";
import { FormContato } from "@/components/sections/FormContato";
import { Perguntas } from "@/components/sections/Perguntas";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Conta pra gente onde o seu negócio trava. A primeira conversa é pra entender o problema.",
};

export default function Contato() {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-12 px-4 pt-10 pb-20 sm:px-6 md:grid-cols-[1fr_1.1fr] md:pt-16">
      <div>
        <h1 className="text-4xl sm:text-6xl">Nos conta o problema</h1>
        <p className="mt-4 max-w-md text-lg text-muted">
          Não precisa saber o que você quer contratar. Conta onde o negócio trava e a gente volta com uma proposta do tamanho certo.
        </p>
        <p className="mt-6 text-muted">
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
