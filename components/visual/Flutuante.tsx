"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * "Vida própria": o elemento flutua devagar no lugar.
 * No computador dá pra arrastar — quando solta, volta pro lugar com mola.
 * No celular não arrasta (senão trava a rolagem da página); um toque faz ele "pular".
 * Cada um recebe `fase` diferente pra não se moverem juntos.
 */
type Props = {
  children: ReactNode;
  className?: string;
  fase?: number;      // 0..1 — desencontra o movimento
  amplitude?: number; // px
  giro?: number;      // graus
};

export function Flutuante({ children, className = "", fase = 0, amplitude = 6, giro = 1.2 }: Props) {
  const reduzir = useReducedMotion();
  const [mouse, setMouse] = useState(false);

  useEffect(() => {
    setMouse(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const dur = 7 + fase * 3; // 7–10s: percebe-se, mas não disputa com o texto
  const arrasta = mouse && !reduzir;

  return (
    <motion.div
      className={`${className} ${arrasta ? "cursor-grab active:cursor-grabbing" : ""}`}
      drag={arrasta}
      dragSnapToOrigin
      dragElastic={0.35}
      dragTransition={{ bounceStiffness: 260, bounceDamping: 16 }}
      whileDrag={{ scale: 1.05, zIndex: 30 }}
      whileTap={arrasta ? undefined : { scale: 0.94 }}
    >
      <motion.div
        animate={reduzir ? undefined : { y: [0, -amplitude, 0, amplitude * 0.6, 0], rotate: [-giro, giro, -giro] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: fase * 1.6 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
