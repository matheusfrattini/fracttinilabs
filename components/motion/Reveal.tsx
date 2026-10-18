"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Entrada ao rolar — o único padrão de entrada do site:
 * opacity 0→1 + y 16→0, 0,6s, ease [0.22, 1, 0.36, 1], uma vez só.
 *
 * Respeita "reduzir movimento" pelo MotionConfig do layout.
 * Para animar uma lista em cascata, use RevelaGrupo.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
