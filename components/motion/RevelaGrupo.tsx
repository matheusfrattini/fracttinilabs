"use client";

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import type { ReactNode, ElementType } from "react";

/**
 * Entrada em cascata: os filhos entram um atrás do outro com 0,07s
 * de intervalo. Use <RevelaGrupo as="ul"> com <RevelaItem as="li">.
 *
 * Mesma curva do Reveal, para o site inteiro ter um movimento só.
 */
const CURVA = [0.22, 1, 0.36, 1] as const;

const pai: Variants = {
  oculto: {},
  visivel: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

const filho: Variants = {
  oculto: { opacity: 0, y: 16 },
  visivel: { opacity: 1, y: 0, transition: { duration: 0.6, ease: CURVA } },
};

export function RevelaGrupo({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const Tag = motion.create(as as "div");
  return (
    <Tag
      className={className}
      variants={pai}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </Tag>
  );
}

export function RevelaItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const Tag = motion.create(as as "div");
  return (
    <Tag className={className} variants={filho}>
      {children}
    </Tag>
  );
}
