"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pop-up (diálogo) reutilizável.
 *
 * Fecha com X, ESC e clique fora. Trava a rolagem do fundo enquanto está
 * aberto. No celular ocupa a tela inteira; no computador vira um painel
 * centralizado.
 *
 * Acessibilidade:
 *  - role="dialog" + aria-modal, com o título ligado por aria-labelledby;
 *  - o foco entra no diálogo ao abrir e VOLTA para o elemento que abriu
 *    ao fechar (senão a pessoa que navega por teclado se perde na página);
 *  - Tab circula só dentro do diálogo enquanto ele está aberto.
 *
 * A trava de rolagem compensa a largura da barra para a página não
 * "pular" no momento de abrir.
 */
const FOCAVEIS =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Modal({
  aberto,
  aoFechar,
  idTitulo,
  children,
}: {
  aberto: boolean;
  aoFechar: () => void;
  /** id do elemento que dá nome ao diálogo (aria-labelledby). */
  idTitulo: string;
  children: ReactNode;
}) {
  const reduzir = useReducedMotion();
  const painel = useRef<HTMLDivElement>(null);
  const focoAnterior = useRef<HTMLElement | null>(null);

  // trava a rolagem do fundo + compensa a barra de rolagem
  useEffect(() => {
    if (!aberto) return;
    const { body } = document;
    const larguraBarra = window.innerWidth - document.documentElement.clientWidth;
    const overflowAntes = body.style.overflow;
    const paddingAntes = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (larguraBarra > 0) body.style.paddingRight = `${larguraBarra}px`;
    return () => {
      body.style.overflow = overflowAntes;
      body.style.paddingRight = paddingAntes;
    };
  }, [aberto]);

  // ESC fecha; Tab circula dentro do diálogo
  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        aoFechar();
        return;
      }
      if (e.key !== "Tab" || !painel.current) return;
      const itens = Array.from(painel.current.querySelectorAll<HTMLElement>(FOCAVEIS)).filter(
        (el) => el.offsetParent !== null
      );
      if (itens.length === 0) return;
      const primeiro = itens[0];
      const ultimo = itens[itens.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [aberto, aoFechar]);

  // foco entra ao abrir e volta ao fechar
  const jaAbriu = useRef(false);
  useEffect(() => {
    if (aberto) {
      jaAbriu.current = true;
      focoAnterior.current = document.activeElement as HTMLElement | null;
      // espera o painel existir no DOM
      const t = setTimeout(() => {
        const alvo =
          painel.current?.querySelector<HTMLElement>("[data-foco-inicial]") ??
          painel.current?.querySelector<HTMLElement>(FOCAVEIS) ??
          painel.current;
        alvo?.focus();
      }, 20);
      return () => clearTimeout(t);
    }
    // só devolve o foco se este diálogo chegou a abrir nesta sessão
    if (jaAbriu.current) focoAnterior.current?.focus?.();
  }, [aberto]);

  const duracao = reduzir ? 0 : 0.28;

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          className="fixed inset-0 z-50 flex items-stretch justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duracao }}
        >
          {/* clique fora fecha */}
          <div
            className="absolute inset-0 bg-paper/80 backdrop-blur-sm"
            onClick={aoFechar}
            aria-hidden
          />

          <motion.div
            ref={painel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={idTitulo}
            tabIndex={-1}
            className="vidro relative flex max-h-full w-full flex-col overflow-hidden outline-none sm:max-w-4xl sm:rounded-[var(--radius-card)]"
            initial={reduzir ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={reduzir ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduzir ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: duracao, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={aoFechar}
              aria-label="Fechar"
              data-foco-inicial
              className="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full border border-line bg-paper/80 text-muted transition-colors hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="overflow-y-auto overscroll-contain">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
