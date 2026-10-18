"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Flutuante } from "@/components/visual/Flutuante";

/**
 * Palco do hero: a logo 3D no centro e, soltos em volta, os pedaços
 * da apresentação (conversa no WhatsApp → pedido no painel).
 * Os pedaços flutuam e, no computador, podem ser arrastados.
 *
 * A conversa é ILUSTRATIVA (está escrito na legenda) — sem números
 * nem dados de cliente real. Para trocar o exemplo, edite abaixo.
 */
const Logo3D = dynamic(() => import("@/components/visual/Logo3D"), {
  ssr: false,
  loading: () => null,
});

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

const PASSOS = conversa.length + 1;
const INTERVALO = 1400;
const PAUSA_FINAL = 4200;

function useRoteiro() {
  const reduzir = useReducedMotion();
  const [passo, setPasso] = useState(0);
  const [ciclo, setCiclo] = useState(0);

  useEffect(() => {
    if (reduzir) {
      setPasso(PASSOS);
      return;
    }
    const espera = passo >= PASSOS ? PAUSA_FINAL : passo === 0 ? 900 : INTERVALO;
    const t = setTimeout(() => {
      if (passo >= PASSOS) {
        setCiclo((c) => c + 1);
        setPasso(0);
      } else {
        setPasso((p) => p + 1);
      }
    }, espera);
    return () => clearTimeout(t);
  }, [passo, reduzir]);

  return { passo, ciclo };
}

const cartao = "rounded-2xl bg-surface-2/90 ring-1 ring-line shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md";

function Conversa({ passo, ciclo }: { passo: number; ciclo: number }) {
  const mensagens = conversa.slice(0, Math.min(passo, conversa.length));
  return (
    <div className={`${cartao} w-[232px] p-3 sm:w-[248px]`}>
      <div className="mb-2 flex items-center gap-2 px-1">
        <span className="grid size-6 place-items-center rounded-full bg-ok text-[11px] font-bold text-on-brand" aria-hidden>W</span>
        <span className="text-[13px] font-medium">Atendimento automático</span>
      </div>
      <div className="relative h-[180px] overflow-hidden" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.ul key={ciclo} className="absolute inset-0 flex flex-col justify-end gap-1.5" exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            {mensagens.map((m, i) => (
              <motion.li
                key={i}
                layout
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`max-w-[88%] shrink-0 rounded-2xl px-3 py-1.5 text-[13px] leading-snug ${
                  // cores do modo escuro do WhatsApp (exceção à regra de tokens)
                  m.de === "cliente" ? "self-end rounded-br-md bg-[#005c4b] text-[#e9fff6]" : "self-start rounded-bl-md bg-[#1f2c34] text-ink"
                }`}
              >
                {m.texto}
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Pedidos({ entrou }: { entrou: boolean }) {
  return (
    <div className={`${cartao} w-[220px] p-3 sm:w-[240px]`}>
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-[13px] font-semibold">Pedidos de hoje</span>
        <span className="text-[11px] text-muted">painel</span>
      </div>
      <ul className="flex flex-col gap-1.5">
        <AnimatePresence initial={false}>
          {entrou && (
            <motion.li
              key="novo"
              layout
              initial={{ opacity: 0, x: -14, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="flex items-center justify-between gap-2 rounded-xl bg-brand-soft px-2.5 py-2 ring-1 ring-brand/50"
            >
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-medium">{pedido.item}</span>
                <span className="text-[11px] text-muted">{pedido.bairro}</span>
              </span>
              <span className="shrink-0 rounded-full bg-accent/25 px-2 py-0.5 text-[11px] font-medium text-accent-ink">novo</span>
            </motion.li>
          )}
        </AnimatePresence>
        {anteriores.map((p) => (
          <motion.li layout key={p.item} className="rounded-xl px-2.5 py-2 ring-1 ring-line">
            <span className="block text-[13px] text-ink/80">{p.item}</span>
            <span className="text-[11px] text-muted">{p.bairro}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function Etiqueta({ cor, texto }: { cor: "ok" | "brand" | "accent"; texto: string }) {
  const ponto = { ok: "bg-ok", brand: "bg-brand", accent: "bg-accent" }[cor];
  return (
    <span className={`${cartao} inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-medium`}>
      <span className={`size-2 rounded-full ${ponto} shadow-[0_0_10px_currentColor]`} aria-hidden />
      {texto}
    </span>
  );
}

export function DemoFluxo() {
  const { passo, ciclo } = useRoteiro();

  return (
    <figure className="relative">
      {/* Palco: altura fixa, as peças ficam posicionadas em volta da logo */}
      <div className="relative mx-auto h-[640px] w-full max-w-[560px] sm:h-[560px]">
        <div className="glitch-logo absolute inset-x-0 top-0 mx-auto w-full max-w-[520px] sm:top-[18%]">
          <Logo3D className="h-[260px] w-full sm:h-[380px]" />
        </div>

        <Flutuante fase={0.1} className="absolute top-[262px] left-0 z-10 sm:top-0">
          <Conversa passo={passo} ciclo={ciclo} />
        </Flutuante>

        <Flutuante fase={0.55} className="absolute right-0 bottom-0 z-20 sm:z-10">
          <Pedidos entrou={passo >= PASSOS} />
        </Flutuante>

        <Flutuante fase={0.3} amplitude={14} giro={4} className="absolute top-[6%] right-[2%] z-10 hidden sm:block">
          <Etiqueta cor="ok" texto="Site no ar" />
        </Flutuante>
        <Flutuante fase={0.8} amplitude={12} giro={5} className="absolute top-[222px] right-1 z-10 sm:top-auto sm:right-auto sm:bottom-[10%] sm:left-[2%]">
          <Etiqueta cor="accent" texto="Novo contato" />
        </Flutuante>
        <Flutuante fase={0.45} amplitude={16} giro={3} className="absolute top-[48%] right-0 z-10 hidden sm:block">
          <Etiqueta cor="brand" texto="Painel atualizado" />
        </Flutuante>
      </div>
      <figcaption className="mt-2 text-center text-sm text-muted sm:text-left">
        Exemplo ilustrativo: a conversa no WhatsApp vira pedido organizado no painel.
        <span className="hidden [@media(pointer:fine)]:inline"> Arraste as peças e a logo.</span>
      </figcaption>
    </figure>
  );
}
