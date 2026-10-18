"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { jornada } from "@/content/jornada";
import { Botao } from "@/components/ui/Botao";
import { RevelaGrupo, RevelaItem } from "@/components/motion/RevelaGrupo";

/**
 * "Onde o seu negócio trava hoje?" — a jornada em três etapas:
 * dor -> custo de deixar como está -> saída.
 *
 * A jornada é literal: uma trilha vertical liga as três etapas e vai se
 * preenchendo conforme a pessoa rola. A cor caminha junto —
 * cinza (dor) -> laranja (custo) -> azul (saída) — então a seção conta a
 * virada sem precisar dizer "antes e depois".
 *
 * O laranja aparece UMA vez na tela inteira, no marcador do custo: é a
 * regra de acento pontual do projeto, e aqui ele marca justamente o
 * momento que precisa incomodar.
 *
 * Com "reduzir movimento" a trilha já aparece inteira preenchida.
 */
const cores = {
  dor: {
    marcador: "border-line text-muted",
    rotulo: "text-muted",
  },
  custo: {
    marcador: "border-accent/50 text-accent-ink",
    rotulo: "text-accent-ink",
  },
  solucao: {
    marcador: "border-brand/60 text-brand",
    rotulo: "text-brand",
  },
} as const;

export function JornadaDor() {
  const reduzir = useReducedMotion();
  const trilha = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trilha,
    offset: ["start 75%", "end 65%"],
  });
  // mola leve para a trilha não "pular" a cada passo da rolagem
  const progresso = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  // A trilha é REVELADA de cima pra baixo, não esticada: o gradiente fica
  // parado no lugar e o recorte sobe. Com scaleY, o degradê inteiro se
  // espremia dentro do trecho já percorrido e o azul aparecia na etapa 1.
  const recorte = useTransform(progresso, (v) => `inset(0 0 ${(1 - v) * 100}% 0)`);

  return (
    <section id="jornada" className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 md:py-36">
      <header className="mb-16 md:mb-24">
        <h2 className="titulo-secao max-w-3xl">Onde o seu negócio trava hoje?</h2>
        <p className="texto-leitura mt-5 text-[17px] leading-relaxed text-muted">
          Quase sempre o problema não é o que parece à primeira vista. Vale percorrer as três
          perguntas antes de decidir o que contratar.
        </p>
      </header>

      <div ref={trilha} className="relative">
        {/* trilha: linha apagada no fundo + linha acesa que cresce ao rolar */}
        <div
          aria-hidden
          className="absolute top-5 bottom-5 left-5 w-px bg-line md:left-6"
        />
        <motion.div
          aria-hidden
          className="absolute top-5 bottom-5 left-5 w-px md:left-6"
          style={{
            clipPath: reduzir ? "inset(0 0 0% 0)" : recorte,
            background:
              "linear-gradient(to bottom, var(--color-muted), var(--color-accent) 50%, var(--color-brand))",
          }}
        />

        <RevelaGrupo as="ol">
          {jornada.map((etapa, i) => {
            const c = cores[etapa.id];
            return (
              <RevelaItem
                as="li"
                key={etapa.id}
                className={`relative grid grid-cols-[2.5rem_1fr] gap-x-5 md:grid-cols-[3rem_1fr] md:gap-x-8 ${
                  i > 0 ? "mt-14 md:mt-20" : ""
                }`}
              >
                {/* marcador numerado */}
                <span
                  aria-hidden
                  className={`grid size-10 place-items-center rounded-full border bg-paper font-display text-sm md:size-12 md:text-base ${c.marcador}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="pt-1.5 md:pt-2.5">
                  <p className={`mb-3 text-xs tracking-[0.14em] ${c.rotulo}`}>{etapa.rotulo}</p>

                  <h3 className="max-w-2xl text-2xl leading-snug sm:text-3xl md:text-[2.1rem]">
                    {etapa.pergunta}
                  </h3>

                  <p className="texto-leitura mt-4 text-[17px] leading-relaxed text-muted sm:text-lg">
                    {etapa.resposta}
                  </p>

                  {etapa.sintomas && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {etapa.sintomas.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-line px-3.5 py-1.5 text-sm text-muted"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </RevelaItem>
            );
          })}
        </RevelaGrupo>
      </div>

      {/* a jornada termina no convite, alinhada com a coluna de texto */}
      <div className="mt-14 pl-[3.75rem] md:mt-20 md:pl-20">
        <Botao href="/contato/">Nos conta o problema</Botao>
      </div>
    </section>
  );
}
