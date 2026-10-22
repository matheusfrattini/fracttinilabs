"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Tela } from "@/content/projetos";
import { caminho } from "@/lib/caminho";

/**
 * Carrossel das telas do projeto, com legenda curta embaixo de cada uma.
 *
 * Navegação por abas numeradas, por setas e pelas teclas ← →. Pensado
 * para 2 a 4 telas: acima disso as abas ficam apertadas no celular.
 *
 * A altura é reservada pelo quadro (aspect-[16/10]), então trocar de tela
 * não empurra o conteúdo do pop-up.
 */
export function Carrossel({ telas, nome }: { telas: Tela[]; nome: string }) {
  const reduzir = useReducedMotion();
  const [i, setI] = useState(0);

  if (telas.length === 0) {
    return (
      <div className="grid aspect-[16/10] w-full place-items-center rounded-xl border border-dashed border-line bg-paper text-sm text-muted">
        [PRINTS PENDENTES]
      </div>
    );
  }

  const tela = telas[i];
  const anterior = () => setI((v) => (v - 1 + telas.length) % telas.length);
  const proxima = () => setI((v) => (v + 1) % telas.length);

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") { e.preventDefault(); anterior(); }
        if (e.key === "ArrowRight") { e.preventDefault(); proxima(); }
      }}
    >
      {/* quadro */}
      <div className="relative overflow-hidden rounded-xl border border-line bg-paper">
        <div className="relative aspect-[16/10] w-full">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={tela.src}
              src={caminho(tela.src)}
              alt={`${nome} — ${tela.legenda}`}
              className="absolute inset-0 h-full w-full object-cover object-top"
              loading="lazy"
              decoding="async"
              initial={reduzir ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduzir ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: reduzir ? 0 : 0.25 }}
            />
          </AnimatePresence>
        </div>

        {telas.length > 1 && (
          <>
            <button
              type="button"
              onClick={anterior}
              aria-label="Tela anterior"
              className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-paper/85 text-ink backdrop-blur-sm transition-colors hover:border-[var(--color-line-forte)]"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={proxima}
              aria-label="Próxima tela"
              className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-paper/85 text-ink backdrop-blur-sm transition-colors hover:border-[var(--color-line-forte)]"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* legenda — altura reservada para não pular ao trocar de tela */}
      <p className="mt-3 min-h-10 text-[15px] leading-relaxed text-muted" aria-live="polite">
        <span className="text-muted/70">{String(i + 1).padStart(2, "0")}/{String(telas.length).padStart(2, "0")}</span>{" "}
        {tela.legenda}
      </p>

      {/* abas */}
      {telas.length > 1 && (
        <div role="tablist" aria-label="Telas do projeto" className="mt-3 flex flex-wrap gap-2">
          {telas.map((t, n) => (
            <button
              key={t.src}
              role="tab"
              type="button"
              aria-selected={n === i}
              onClick={() => setI(n)}
              className={`aperta min-h-10 rounded-full px-4 text-sm transition-colors ${
                n === i
                  ? "bg-ink text-paper"
                  : "border border-line text-muted hover:border-[var(--color-line-forte)] hover:text-ink"
              }`}
            >
              {String(n + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
