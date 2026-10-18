import { Reveal } from "@/components/motion/Reveal";

/**
 * Substitui a antiga seção de equipe: em vez de apresentar pessoas,
 * reforça que a empresa é de Campinas e trabalha de perto.
 * Cada frase aqui é uma promessa — só mantenha o que vocês cumprem.
 */
export function Local() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 md:py-36">
      <Reveal>
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <h2 className="titulo-secao">Uma equipe de Campinas, para negócios daqui.</h2>
          <div className="texto-leitura space-y-5 text-[17px] leading-relaxed text-muted sm:text-lg">
            <p>
              Todo mundo na fracttini.labs é de Campinas. Isso quer dizer conversa presencial quando precisa,
              visita para entender a operação de perto e alguém por perto depois que o projeto vai para o ar.
            </p>
            <p>
              O que a gente combina fica por escrito, com prazo e escopo claros, e cada entrega é revisada
              antes de chegar até você.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
