"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navegacao } from "@/content/site";
import { Logo } from "./Logo";

function ativo(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));
}

export function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => setAberto(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
  }, [aberto]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background,box-shadow] duration-300 ${
        rolou || aberto ? "bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="fracttini.labs — início">
          <Logo />
        </Link>

        {/* Navegação no computador */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {navegacao.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative rounded-full px-4 py-2 text-[15px] text-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
              aria-current={ativo(pathname, item.href) ? "page" : undefined}
            >
              {ativo(pathname, item.href) && (
                <motion.span
                  layoutId="nav-ativo"
                  className="absolute inset-0 -z-10 rounded-full bg-surface ring-1 ring-line"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              {item.rotulo}
            </Link>
          ))}
          <Link
            href="/contato/"
            className="ml-3 inline-flex min-h-10 items-center rounded-full bg-brand px-5 text-[15px] font-medium text-white transition-colors hover:bg-ink"
          >
            Nos conta o problema
          </Link>
        </nav>

        {/* Botão do menu no celular */}
        <button
          type="button"
          className="-mr-2 grid size-12 place-items-center md:hidden"
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
            className="fixed inset-x-0 top-16 bottom-0 bg-paper px-4 pt-6 md:hidden"
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
                    className="flex min-h-16 items-center font-display text-3xl font-semibold"
                    aria-current={ativo(pathname, item.href) ? "page" : undefined}
                  >
                    {item.rotulo}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link
              href="/contato/"
              className="mt-8 flex min-h-14 items-center justify-center rounded-full bg-brand text-lg font-medium text-white"
            >
              Nos conta o problema
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
