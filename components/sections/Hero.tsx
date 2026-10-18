import { Botao } from "@/components/ui/Botao";
import { Digitando } from "@/components/motion/Digitando";
import { DemoFluxo } from "./DemoFluxo";

/**
 * Hero. Frase principal em Special Text (scramble), glitch sutil na
 * palavra-chave e na logo 3D, e a linha de digitação recorrente.
 * O palco da direita (logo 3D + peças soltas) é o DemoFluxo.
 */
const frasesDigitadas = [
  "perco pedido no WhatsApp.",
  "minha planilha virou um monstro.",
  "faço relatório no domingo à noite.",
  "só eu sei como tudo funciona.",
  "meu site não abre direito no celular.",
] as const;

export function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pt-12 pb-20 sm:px-6 md:grid-cols-[1fr_1.05fr] md:gap-10 md:pt-24 md:pb-32">
      <div>
        <p className="mb-7 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs tracking-[0.14em] text-muted ring-1 ring-inset ring-line">
          <span className="size-1.5 rounded-full bg-ok" aria-hidden />
          CAMPINAS E REGIÃO
        </p>

        <h1 className="titulo-heroi">
          <span className="block">Seu negócio cresce.</span>
          <span className="mt-1 block text-muted">
            A{" "}
            <span className="glitch text-brand" data-texto="bagunça">
              bagunça
            </span>{" "}
            não precisa crescer junto.
          </span>
        </h1>

        {/* digitação recorrente */}
        <div className="mt-8 flex items-start gap-x-2 font-mono text-[15px] text-muted sm:text-base">
          <span className="text-brand" aria-hidden>&gt;</span>
          <Digitando frases={frasesDigitadas} className="flex-1 text-ink" />
        </div>

        <p className="texto-leitura mt-7 text-[17px] leading-relaxed text-muted sm:text-lg">
          A fracttini.labs cria sistemas de gestão, automações com IA e sites para pequenos
          negócios de Campinas e região — começando por entender onde o seu trava.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Botao href="/contato/">Nos conta o problema</Botao>
          <Botao href="/projetos/" variante="secundario">Ver projetos</Botao>
        </div>
      </div>

      <DemoFluxo />
    </section>
  );
}
