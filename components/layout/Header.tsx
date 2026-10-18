"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { navegacao } from "@/content/site";
import { Logo } from "./Logo";

function ativo(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));
}

/**
 * Header "liquid glass" (.vidro em globals.css: blur + saturação, com
 * fallback sólido quando o navegador não suporta backdrop-filter).
 *
 * Comportamento: some ao rolar PARA BAIXO e volta ao rolar PARA CIMA.
 * No topo da página fica transparente. Com o menu aberto nunca some.
 */
export function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [escondido, setEscondido] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => setAberto(false), [pathname]);

  useMotionValueEvent(scrollY, "change", (y) => {
    const anterior = scrollY.getPrevious() ?? 0;
    setRolou(y > 8);
    if (aberto) { setEscondido(false); return; }
    if (y > anterior && y > 120) setEscondido(true);
    else if (y < anterior) setEscondido(false);
  });

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
  }, [aberto]);

  return (
    <motion.header
      className="sticky top-4 z-40 mx-4 sm:mx-6"
      animate={{ y: escondido ? "-130%" : "0%" }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full pr-2 pl-5 transition-colors duration-300 sm:pr-2.5 sm:pl-6 ${
          rolou || aberto ? "vidro" : "border border-line bg-transparent"
        }`}
      >
        <Link href="/" aria-label="fracttini.labs — início" className="inline-flex min-h-11 shrink-0 items-center">
          <Logo />
        </Link>

        {/* Navegação no computador */}
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Principal">
          {navegacao.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative inline-flex min-h-11 items-center rounded-full px-3.5 text-[15px] text-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
              aria-current={ativo(pathname, item.href) ? "page" : undefined}
            >
              {ativo(pathname, item.href) && (
                <motion.span
                  layoutId="nav-ativo"
                  className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-line"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              {item.rotulo}
            </Link>
          ))}
          <Link
            href="/contato/"
            className="aperta ml-3 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[15px] font-medium text-paper transition-colors hover:bg-white"
          >
            Nos conta o problema
          </Link>
        </nav>

        {/* Botão do menu no celular */}
        <button
          type="button"
          className="-mr-1 grid size-12 shrink-0 place-items-center rounded-full lg:hidden"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setAberto((v) => !v)}
        >
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 h-0.5 w-6 bg-ink transition-transform duration-300 ${aberto ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-0.5 w-6 bg-ink transition-transform duration-300 ${aberto ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu"
            className="vidro fixed inset-x-4 top-24 bottom-4 overflow-y-auto rounded-[1.5rem] px-5 pt-4 pb-8 lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col">
              {navegacao.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="border-b border-line"
                >
                  <Link
                    href={item.href}
                    className="flex min-h-16 items-center font-display text-3xl"
                    aria-current={ativo(pathname, item.href) ? "page" : undefined}
                  >
                    {item.rotulo}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link
              href="/contato/"
              className="aperta mt-8 flex min-h-14 items-center justify-center rounded-full bg-ink text-lg font-medium text-paper"
            >
              Nos conta o problema
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
