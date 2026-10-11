"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { categorias, type Categoria, type Projeto } from "@/content/projetos";
import { Selo } from "@/components/ui/Selo";
import { TelaProjeto } from "@/components/ui/TelaProjeto";

type Filtro = Categoria | "todos";

export function ListaProjetos({ projetos, mostrarRascunho }: { projetos: Projeto[]; mostrarRascunho: boolean }) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [aberto, setAberto] = useState<string | null>(null);

  // Lê ?categoria=... e #slug vindos de outros links do site
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("categoria") as Filtro | null;
    if (cat && categorias.some((c) => c.id === cat)) setFiltro(cat);
    const hash = window.location.hash.slice(1);
    if (hash && projetos.some((p) => p.slug === hash)) {
      setAberto(hash);
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, [projetos]);

  const lista = filtro === "todos" ? projetos : projetos.filter((p) => p.categoria === filtro);
  const disponiveis = categorias.filter((c) => c.id === "todos" || projetos.some((p) => p.categoria === c.id));

  return (
    <LayoutGroup>
      {/* Filtros: rolam na horizontal no celular */}
      <div className="-mx-4 mb-8 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0" role="tablist" aria-label="Filtrar projetos">
        <div className="flex w-max gap-1 rounded-full bg-surface p-1 ring-1 ring-line">
          {disponiveis.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={filtro === c.id}
              onClick={() => setFiltro(c.id)}
              className="relative min-h-10 whitespace-nowrap rounded-full px-4 text-[15px] text-muted transition-colors aria-selected:text-white"
            >
              {filtro === c.id && (
                <motion.span layoutId="filtro-ativo" className="absolute inset-0 -z-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
              )}
              <span className="relative">{c.rotulo}</span>
            </button>
          ))}
        </div>
      </div>

      {lista.length === 0 ? (
        <p className="text-muted">Nenhum projeto publicado nesta categoria ainda.</p>
      ) : (
        <motion.ul layout className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {lista.map((p) => (
              <Caso
                key={p.slug}
                projeto={p}
                aberto={aberto === p.slug}
                alternar={() => setAberto((a) => (a === p.slug ? null : p.slug))}
                rascunho={mostrarRascunho && !p.publicar}
              />
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </LayoutGroup>
  );
}

function Caso({ projeto: p, aberto, alternar, rascunho }: { projeto: Projeto; aberto: boolean; alternar: () => void; rascunho: boolean }) {
  const idPainel = `caso-${p.slug}`;
  return (
    <motion.li
      layout
      id={p.slug}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="scroll-mt-24 overflow-hidden rounded-[var(--radius-card)] bg-surface ring-1 ring-line"
    >
      <motion.button
        layout="position"
        onClick={alternar}
        aria-expanded={aberto}
        aria-controls={idPainel}
        className="grid w-full gap-4 p-5 text-left sm:grid-cols-[220px_1fr_auto] sm:items-center sm:gap-6"
      >
        <div className="overflow-hidden rounded-xl ring-1 ring-line">
          <TelaProjeto src={p.telas[0]} nome={p.nome} />
        </div>
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Selo tipo={p.status} />
            {rascunho && <Selo tipo="rascunho" />}
            <span className="text-sm text-muted">{p.tipo}, {p.ano}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl">{p.nome}</h2>
          <p className="mt-1 text-muted">{p.resumo}</p>
        </div>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-brand">
          {aberto ? "Fechar caso" : "Ver o caso"}
          <motion.svg animate={{ rotate: aberto ? 45 : 0 }} width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </motion.svg>
        </span>
      </motion.button>

      <AnimatePresence initial={false}>
        {aberto && (
          <motion.div
            id={idPainel}
            key="conteudo"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid gap-10 border-t border-line p-5 sm:p-8 md:grid-cols-2">
              <div>
                <h3 className="text-lg">O problema</h3>
                <p className="mt-2 text-muted">{p.problema}</p>
              </div>
              <div>
                <h3 className="text-lg">O que a gente fez</h3>
                <ul className="mt-2 space-y-2">
                  {p.oQueFizemos.map((item) => (
                    <li key={item} className="flex gap-3 text-muted">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {p.destaque && (
                <div className="rounded-2xl bg-brand-soft p-6 md:col-span-2">
                  <h3 className="text-lg text-brand">{p.destaque.titulo}</h3>
                  <p className="mt-2 max-w-3xl">{p.destaque.texto}</p>
                </div>
              )}

              {p.telas.length > 1 && (
                <div className="grid gap-4 sm:grid-cols-2 md:col-span-2">
                  {p.telas.slice(1).map((src) => (
                    <div key={src} className="overflow-hidden rounded-xl ring-1 ring-line">
                      <TelaProjeto src={src} nome={p.nome} />
                    </div>
                  ))}
                </div>
              )}

              {p.notaStatus && <p className="text-sm text-muted md:col-span-2">{p.notaStatus}</p>}

              <div className="flex flex-col gap-3 sm:flex-row md:col-span-2">
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full px-6 font-medium ring-1 ring-inset ring-line hover:ring-ink">
                    Abrir o projeto
                  </a>
                )}
                <Link href={`/contato/?sobre=${p.slug}`} className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 font-medium text-white hover:bg-ink">
                  Quero algo assim
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
