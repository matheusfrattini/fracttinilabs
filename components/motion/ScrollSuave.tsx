"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { frame, cancelFrame } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll suave com Lenis, integrado ao loop de frames do Motion
 * (padrão do exemplo oficial: autoRaf: false + frame.setup -> lenis.raf).
 *
 * Com "reduzir movimento" o Lenis NÃO é montado: a pessoa fica com a
 * rolagem nativa do sistema, que é o comportamento esperado.
 */
export function ScrollSuave({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [reduzir, setReduzir] = useState(true); // assume reduzido até saber

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ler = () => setReduzir(mq.matches);
    ler();
    mq.addEventListener("change", ler);
    return () => mq.removeEventListener("change", ler);
  }, []);

  useEffect(() => {
    if (reduzir) return;
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduzir]);

  // Links de âncora passam pelo lenis.scrollTo
  useEffect(() => {
    if (reduzir) return;
    const onClick = (e: MouseEvent) => {
      const alvo = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = alvo?.getAttribute("href");
      if (!alvo || !hash || hash === "#") return;
      const destino = document.querySelector(hash);
      if (!destino) return;
      e.preventDefault();
      lenisRef.current?.lenis?.scrollTo(destino as HTMLElement, { offset: -88 });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reduzir]);

  if (reduzir) return <>{children}</>;

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, duration: 1.1, touchMultiplier: 1.4 }}>
      {children}
    </ReactLenis>
  );
}
