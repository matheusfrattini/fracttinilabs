"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Motion #07 do PDF: o texto "pinta" conforme a pessoa rola — as palavras
 * saem do cinza e chegam na cor principal, uma a uma.
 * Com "reduzir movimento" o texto já aparece pintado.
 */
export function TextoPintado({ texto, className = "" }: { texto: string; className?: string }) {
  const reduzir = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const palavras = texto.split(" ");

  if (reduzir) return <p className={className}>{texto}</p>;

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {palavras.map((palavra, i) => (
        <Palavra key={i} progresso={scrollYProgress} faixa={[i / palavras.length, (i + 1) / palavras.length]}>
          {palavra}
        </Palavra>
      ))}
    </p>
  );
}

function Palavra({
  children,
  progresso,
  faixa,
}: {
  children: string;
  progresso: ReturnType<typeof useScroll>["scrollYProgress"];
  faixa: [number, number];
}) {
  const opacity = useTransform(progresso, faixa, [0.55, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em]">
      {children}
    </motion.span>
  );
}
