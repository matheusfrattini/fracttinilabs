"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Linha de digitação recorrente: escreve uma frase, pausa, apaga e troca.
 *
 * O espaço é RESERVADO pela frase mais longa (um gêmeo invisível no fluxo,
 * com o texto visível por cima). Sem isso a linha muda de altura toda vez
 * que o texto quebra em duas linhas no celular, e empurra a página inteira
 * — era a maior fonte de CLS do site.
 *
 * Com "reduzir movimento" mostra só a primeira frase, parada.
 */
export function Digitando({
  frases,
  className = "",
  velocidade = 55,
  pausa = 1700,
}: {
  frases: readonly string[];
  className?: string;
  velocidade?: number;
  pausa?: number;
}) {
  const reduzir = useReducedMotion();
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [apagando, setApagando] = useState(false);

  const maisLonga = frases.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    if (reduzir) return;
    const frase = frases[i % frases.length];

    if (!apagando && n === frase.length) {
      const t = setTimeout(() => setApagando(true), pausa);
      return () => clearTimeout(t);
    }
    if (apagando && n === 0) {
      setApagando(false);
      setI((v) => (v + 1) % frases.length);
      return;
    }
    const t = setTimeout(() => setN((v) => v + (apagando ? -1 : 1)), apagando ? velocidade / 2 : velocidade);
    return () => clearTimeout(t);
  }, [n, apagando, i, frases, velocidade, pausa, reduzir]);

  if (reduzir) {
    return (
      <span className={`relative block ${className}`}>
        <span className="invisible" aria-hidden>{maisLonga}</span>
        <span className="absolute inset-0">{frases[0]}</span>
      </span>
    );
  }

  return (
    <span className={`relative block ${className}`}>
      {/* gêmeo invisível: só existe para reservar a altura máxima */}
      <span className="invisible" aria-hidden>{maisLonga}</span>
      <span className="absolute inset-0" aria-live="off">
        {frases[i % frases.length].slice(0, n)}
        <span className="cursor-digita ml-0.5 h-[1em] align-[-0.15em]" aria-hidden />
      </span>
    </span>
  );
}
