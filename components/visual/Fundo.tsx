"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo "sistema": grade quadriculada fixa + nós que acendem nos
 * cruzamentos da grade (nas cores da logo) + luz que segue o cursor.
 * Leve: um canvas só, ~12 nós por vez, pausa quando a aba não está visível.
 */
const TAM = 56;
const CORES = ["79,163,255", "25,179,107", "242,130,31"]; // azul, verde, laranja
const PESOS = [0.7, 0.18, 0.12]; // laranja e verde aparecem pouco

type No = { x: number; y: number; cor: string; vida: number; dur: number };

function sorteiaCor() {
  const r = Math.random();
  return r < PESOS[0] ? CORES[0] : r < PESOS[0] + PESOS[1] ? CORES[1] : CORES[2];
}

export function Fundo() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const luz = useRef<HTMLDivElement>(null);

  // Luz no cursor (só em aparelho com mouse)
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = luz.current;
    const mover = (e: PointerEvent) => {
      el?.style.setProperty("--mx", `${e.clientX}px`);
      el?.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", mover, { passive: true });
    return () => window.removeEventListener("pointermove", mover);
  }, []);

  // Nós piscando nos cruzamentos
  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, ox = 0;
    const nos: No[] = [];
    let raf = 0;
    let ultimo = performance.now();

    const medir = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ox = ((w / 2) % TAM); // grade alinhada ao centro, igual ao CSS
    };
    const novoNo = (): No => ({
      x: ox + Math.floor(Math.random() * (w / TAM + 1)) * TAM,
      y: Math.floor(Math.random() * (h / TAM + 1)) * TAM,
      cor: sorteiaCor(),
      vida: 0,
      dur: 1800 + Math.random() * 2600,
    });

    const desenhar = (agora: number) => {
      const dt = Math.min(agora - ultimo, 64);
      ultimo = agora;
      ctx.clearRect(0, 0, w, h);
      const alvo = w < 640 ? 7 : 12;
      while (nos.length < alvo) nos.push({ ...novoNo(), vida: Math.random() * 1500 });
      for (let i = nos.length - 1; i >= 0; i--) {
        const n = nos[i];
        n.vida += dt;
        const t = n.vida / n.dur;
        if (t >= 1) { nos.splice(i, 1); continue; }
        const a = Math.sin(Math.PI * t); // acende e apaga
        ctx.fillStyle = `rgba(${n.cor},${0.9 * a})`;
        ctx.fillRect(n.x - 2, n.y - 2, 4, 4);
        ctx.strokeStyle = `rgba(${n.cor},${0.35 * a})`;
        ctx.strokeRect(n.x - 6, n.y - 6, 12, 12);
      }
      raf = requestAnimationFrame(desenhar);
    };

    medir();
    if (reduzir) {
      for (let i = 0; i < 10; i++) nos.push({ ...novoNo(), vida: 900, dur: 1800 });
      desenhar(performance.now());
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(desenhar);
    }
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduzir) { ultimo = performance.now(); raf = requestAnimationFrame(desenhar); }
    };
    window.addEventListener("resize", medir);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", medir);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="fundo-grade absolute inset-0" />
      <div ref={luz} className="fundo-grade-luz absolute inset-0" />
      <canvas ref={canvas} className="absolute inset-0" />
      {/* vinheta: escurece as bordas pra grade não brigar com o texto */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-paper)_95%)]" />
    </div>
  );
}
