"use client";

import { useEffect, useState } from "react";
import { tipos } from "@/content/tipos";
import { Secao } from "@/components/ui/Secao";
import { BotaoSeta } from "@/components/ui/BotaoSeta";
import { RevelaGrupo, RevelaItem } from "@/components/motion/RevelaGrupo";

/**
 * Motion #08 do PDF (ref. 01-cards-servico-dixor-hover.png), adaptado
 * para o tema escuro:
 *   - parado: ícone, título e botão;
 *   - no hover: o título SOBE e a descrição aparece com 0,1s de atraso;
 *   - um card já começa aberto (tipos[].aberto).
 *
 * No celular não existe hover: todos os cards ficam abertos.
 * Com "reduzir movimento" a transição é instantânea (classe motion-reduce).
 */
const icones: Record<string, React.ReactNode> = {
  dashboards: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="26" height="22" rx="3" />
      <path d="M3 11h26M8 22v-5M14 22v-8M20 22v-3M26 22v-6" />
    </svg>
  ),
  automacoes: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M27 15.5A11 11 0 1 1 9.6 6.4" />
      <path d="M5 27l1.4-4.6" />
      <circle cx="16" cy="15.5" r="4" />
      <path d="M22 3v6M19 6h6" />
    </svg>
  ),
  "web-design": (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="26" height="20" rx="3" />
      <path d="M3 10h26M11 29h10M16 25v4" />
      <circle cx="6.5" cy="7.5" r="0.6" fill="currentColor" />
    </svg>
  ),
  aplicativos: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="3" width="12" height="26" rx="3" />
      <path d="M14.5 6.5h3M15 25.5h2" />
      <path d="M3 13l-2 3 2 3M29 13l2 3-2 3" />
    </svg>
  ),
};

export function CardsTipos() {
  const [semHover, setSemHover] = useState(true); // assume celular até saber

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const ler = () => setSemHover(!mq.matches);
    ler();
    mq.addEventListener("change", ler);
    return () => mq.removeEventListener("change", ler);
  }, []);

  return (
    <Secao
      id="tipos"
      titulo="O que a gente faz"
      intro="Quatro frentes que se conversam. Dá pra começar por uma e somar as outras quando fizer sentido."
    >
      <RevelaGrupo as="ul" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tipos.map((t) => {
          // aberto = sempre no celular, ou o card marcado como aberto no desktop
          const aberto = semHover || Boolean(t.aberto);
          return (
            <RevelaItem as="li" key={t.slug}>
              <article
                className={`card-hover group/card flex h-full flex-col rounded-[var(--radius-card)] border p-7 xl:p-6 ${
                  aberto
                    ? "border-[var(--color-line-forte)] bg-surface"
                    : "border-line bg-surface/40 hover:border-[var(--color-line-forte)] hover:bg-surface"
                }`}
              >
                <span
                  className={`mb-8 block size-8 transition-colors duration-300 ${aberto ? "text-brand" : "text-muted group-hover/card:text-brand"}`}
                  aria-hidden
                >
                  {icones[t.slug]}
                </span>

                {/* bloco que sobe no hover */}
                <div
                  className={`flex-1 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    aberto ? "" : "translate-y-[var(--sobe,0px)] group-hover/card:translate-y-0"
                  }`}
                >
                  <h3 className="text-[1.35rem] leading-snug">
                    {t.titulo}
                  </h3>
                  <p className="mt-1.5 text-sm text-brand">{t.chamada}</p>

                  {/* descrição: aparece com 0,1s de atraso */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      aberto
                        ? "mt-3 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0 delay-0 group-hover/card:mt-3 group-hover/card:grid-rows-[1fr] group-hover/card:opacity-100 group-hover/card:delay-100"
                    }`}
                  >
                    <p className="overflow-hidden text-[15px] leading-relaxed text-muted">{t.descricao}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <BotaoSeta href={`/${t.slug}/`} ativo={aberto}>
                    Ver {t.rotuloCurto}
                  </BotaoSeta>
                </div>
              </article>
            </RevelaItem>
          );
        })}
      </RevelaGrupo>
    </Secao>
  );
}
