"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * O "momento" do site: uma conversa no WhatsApp que vira um pedido
 * organizado no painel. É ILUSTRATIVO (está escrito na legenda) —
 * não mostra números nem dados de cliente real.
 *
 * Para trocar o exemplo, edite `conversa` e `pedido` abaixo.
 */
const conversa = [
  { de: "cliente", texto: "Oi! Vocês entregam no Cambuí?" },
  { de: "bot", texto: "Entregamos sim. Quer ver o cardápio de hoje?" },
  { de: "cliente", texto: "Quero 2 marmitas, uma sem cebola." },
  { de: "bot", texto: "Anotado! Seu pedido já foi pra cozinha." },
] as const;

const pedido = { item: "2 marmitas · 1 sem cebola", bairro: "Cambuí" };
const anteriores = [
  { item: "1 marmita fit", bairro: "Taquaral" },
  { item: "3 marmitas", bairro: "Centro" },
];

const PASSOS = conversa.length + 1; // mensagens + o pedido entrando no painel
const INTERVALO = 1400;
const PAUSA_FINAL = 4200;

export function DemoFluxo() {
  const reduzir = useReducedMotion();
  const [passo, setPasso] = useState(0);

  useEffect(() => {
    if (reduzir) {
      setPasso(PASSOS);
      return;
    }
    const espera = passo >= PASSOS ? PAUSA_FINAL : passo === 0 ? 700 : INTERVALO;
    const t = setTimeout(() => setPasso((p) => (p >= PASSOS ? 0 : p + 1)), espera);
    return () => clearTimeout(t);
  }, [passo, reduzir]);

  const mensagens = conversa.slice(0, Math.min(passo, conversa.length));
  const pedidoEntrou = passo >= PASSOS;

  return (
    <figure className="relative">
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr] md:grid-cols-1 lg:grid-cols-[1fr_1fr]">
        {/* Conversa */}
        <div className="rounded-[var(--radius-card)] bg-[#e9efe7] p-3 ring-1 ring-line">
          <div className="mb-2 flex items-center gap-2 px-1">
            <span className="grid size-7 place-items-center rounded-full bg-[#1f8a5b] text-xs font-bold text-white" aria-hidden>
              W
            </span>
            <span className="text-sm font-medium">Atendimento automático</span>
          </div>
          <ul className="flex min-h-[236px] flex-col justify-end gap-2" aria-live="polite">
            <AnimatePresence initial={false}>
              {mensagens.map((m, i) => (
                <motion.li
                  key={`${passo === 0 ? "r" : "m"}-${i}`}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-[14px] leading-snug shadow-[0_1px_0_rgba(18,26,43,0.06)] ${
                    m.de === "cliente" ? "self-end rounded-br-md bg-[#d6f5c9]" : "self-start rounded-bl-md bg-white"
                  }`}
                >
                  {m.texto}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        {/* Painel */}
        <div className="rounded-[var(--radius-card)] bg-surface p-4 ring-1 ring-line">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold">Pedidos de hoje</span>
            <span className="text-xs text-muted">painel</span>
          </div>
          <ul className="flex flex-col gap-2">
            <AnimatePresence initial={false}>
              {pedidoEntrou && (
                <motion.li
                  key="novo"
                  layout
                  initial={{ opacity: 0, x: -16, backgroundColor: "#e6ecf6" }}
                  animate={{ opacity: 1, x: 0, backgroundColor: "#ffffff" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, backgroundColor: { duration: 2.4 } }}
                  className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 ring-1 ring-brand/30"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-medium">{pedido.item}</span>
                    <span className="text-xs text-muted">{pedido.bairro}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-[#a8501c]">novo</span>
                </motion.li>
              )}
            </AnimatePresence>
            {anteriores.map((p) => (
              <motion.li layout key={p.item} className="rounded-xl px-3 py-2.5 ring-1 ring-line">
                <span className="block text-[14px] text-ink/80">{p.item}</span>
                <span className="text-xs text-muted">{p.bairro}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted">
        Exemplo ilustrativo: a conversa no WhatsApp vira pedido organizado no painel.
      </figcaption>
    </figure>
  );
}
