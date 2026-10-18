"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Typewriter — o texto é "digitado" letra a letra quando entra na tela.
 *
 * ONDE USAR: só em TEXTO DE EXPLICAÇÃO (o parágrafo que explica o que a
 * frente de trabalho resolve, pra quem é, o que a página mostra).
 * NUNCA em título, card, rodapé nem em nada da home — ali o texto entra
 * direto, com o Reveal.
 *
 * LAYOUT: o texto completo fica no fluxo, invisível, segurando o espaço;
 * o texto digitado é desenhado por cima em posição absoluta. Sem isso, a
 * cada letra o parágrafo mudaria de altura e empurraria a página (foi o
 * que aconteceu com a linha de digitação do herói antes de reservar a
 * altura). Assim o CLS fica em zero.
 *
 * ACESSIBILIDADE: o texto completo também vai em sr-only, então o leitor
 * de tela recebe tudo de uma vez. Com "reduzir movimento", aparece
 * pronto, sem animar.
 *
 * RITMO: a velocidade é calculada a partir do tamanho do texto para a
 * digitação durar sempre ~1,8s. Um parágrafo longo não pode prender a
 * leitura — é o motivo de não existir um `speed` fixo aqui.
 */
const DURACAO_ALVO = 1800; // ms
const MS_MIN = 8;
const MS_MAX = 28;

export function Maquina({
  texto,
  className = "",
  delay = 0,
  as: Tag = "p",
}: {
  texto: string;
  className?: string;
  /** ms antes de começar — use para escalonar dois parágrafos seguidos. */
  delay?: number;
  as?: "p" | "span" | "div";
}) {
  const reduzir = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const visivel = useInView(ref, { once: true, margin: "-15%" });
  const [n, setN] = useState(0);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    if (reduzir) { setPronto(true); return; }
    if (!visivel || pronto) return;

    const passo = Math.min(MS_MAX, Math.max(MS_MIN, DURACAO_ALVO / texto.length));
    let timer: number;

    const inicio = window.setTimeout(() => {
      const tick = () => {
        setN((v) => {
          if (v >= texto.length) { setPronto(true); return v; }
          timer = window.setTimeout(tick, passo);
          return v + 1;
        });
      };
      tick();
    }, delay);

    return () => { clearTimeout(inicio); clearTimeout(timer); };
  }, [visivel, texto, delay, reduzir, pronto]);

  // Terminou (ou movimento reduzido): texto normal, sem camadas.
  if (pronto) {
    return <Tag ref={ref as never} className={className}>{texto}</Tag>;
  }

  return (
    <Tag ref={ref as never} className={`relative ${className}`}>
      {/* segura o espaço exato do texto final */}
      <span className="invisible" aria-hidden>{texto}</span>
      {/* o texto sendo digitado, por cima, sem afetar o layout */}
      <span className="absolute inset-0" aria-hidden>
        {texto.slice(0, n)}
        {n > 0 && <span className="cursor-maquina" />}
      </span>
      <span className="sr-only">{texto}</span>
    </Tag>
  );
}
