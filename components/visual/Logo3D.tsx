"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * Logo 3D (public/3d/logo.glb — convertido do infinity-logo.obj e
 * comprimido com meshopt: 2,7 MB -> ~90 KB).
 *
 * Este arquivo e a casca LEVE: ele nao importa three.js. A parte pesada
 * mora em CanvasLogo.tsx e so e baixada quando o canvas vai montar.
 *
 * Como funciona:
 *  - sempre comeca com a imagem estatica /3d/logo.png;
 *  - sem WebGL ou com "reduzir movimento", fica so na imagem;
 *  - com WebGL, o canvas monta na PRIMEIRA INTERACAO da pessoa
 *    (mexeu o mouse, rolou, tocou, usou o teclado).
 *
 * O porque da interacao: three.js custa ~3,5s de thread principal e
 * ~230 kB. Carregar isso no inicio travava a primeira rolagem no celular,
 * que e a tela principal aqui — o trafego vem do Instagram.
 *
 * Depois de montado, o canvas ainda so renderiza quando esta visivel
 * na tela (economiza bateria).
 */
const CanvasLogo = dynamic(() => import("./CanvasLogo"), {
  ssr: false,
  loading: () => null,
});

function suportaWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Logo3D({ className = "" }: { className?: string }) {
  const caixa = useRef<HTMLDivElement>(null);
  const [modo, setModo] = useState<"imagem" | "3d">("imagem");
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzir || !suportaWebGL()) return; // fica na imagem estatica

    let cancelado = false;
    const sinais = ["pointerdown", "pointermove", "touchstart", "wheel", "scroll", "keydown"] as const;

    const montar = () => {
      if (cancelado) return;
      cancelado = true;
      sinais.forEach((s) => window.removeEventListener(s, montar));
      // deixa a thread respirar antes de puxar o three.js
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => setModo("3d"), { timeout: 600 });
      } else {
        window.setTimeout(() => setModo("3d"), 80);
      }
    };

    sinais.forEach((s) => window.addEventListener(s, montar, { passive: true, once: true }));

    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { rootMargin: "100px" });
    if (caixa.current) io.observe(caixa.current);

    return () => {
      cancelado = true;
      sinais.forEach((s) => window.removeEventListener(s, montar));
      io.disconnect();
    };
  }, []);

  return (
    <div ref={caixa} className={`relative ${className}`}>
      {/* brilho atras da logo */}
      <div aria-hidden className="absolute inset-[15%] rounded-full bg-brand/25 blur-3xl" />

      {/* A imagem estatica fica SEMPRE embaixo: e o que a pessoa ve antes
          do canvas e evita o "pisca" na troca. Com o 3D no ar, ela vira
          decoracao e sai da arvore de acessibilidade. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/3d/logo.png"
        alt={modo === "3d" ? "" : "Logo da fracttini.labs"}
        aria-hidden={modo === "3d" || undefined}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
          modo === "3d" ? "opacity-0" : "opacity-100"
        }`}
      />

      {modo === "3d" && <CanvasLogo visivel={visivel} />}
    </div>
  );
}
