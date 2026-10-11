import { Botao } from "@/components/ui/Botao";
import { DemoFluxo } from "./DemoFluxo";

export function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-10 pb-16 sm:px-6 md:grid-cols-[1.15fr_1fr] lg:gap-16 md:pt-16 md:pb-24">
      <div>
        <h1 className="text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.1rem]">
          Seu negócio cresce. A bagunça não precisa crescer junto.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
          A fracttini.labs cria sistemas de gestão, automações com IA e sites para pequenos negócios
          de Campinas e região — começando por entender onde o seu trava.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Botao href="/contato/">Nos conta o problema</Botao>
          <Botao href="/projetos/" variante="secundario">Ver projetos</Botao>
        </div>
      </div>
      <DemoFluxo />
    </section>
  );
}
