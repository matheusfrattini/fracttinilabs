"use client";

import Link from "next/link";
import { useState } from "react";
import type { Projeto } from "@/content/projetos";
import { Moldura } from "@/components/ui/Moldura";
import { Selo } from "@/components/ui/Selo";
import { ModalProjeto } from "./ModalProjeto";
import { emDev } from "@/lib/publicar";

/**
 * Grade de cards de projeto.
 *
 * Projeto de SITE abre o pop-up de apresentação (é um <button>, porque o
 * clique não leva a lugar nenhum — vira um diálogo). Os outros tipos
 * continuam sendo link: para o caso em /projetos, ou direto para o
 * GitHub Pages quando o projeto ainda está em construção.
 */
export function GradeProjetos({ projetos }: { projetos: Projeto[] }) {
  // `projeto` continua preenchido enquanto o pop-up fecha: se ele virasse
  // null junto com `aberto`, o diálogo desmontaria na hora — sem animação
  // de saída e sem devolver o foco para o card.
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [aberto, setAberto] = useState(false);

  const abrir = (p: Projeto) => { setProjeto(p); setAberto(true); };

  return (
    <>
      <ul className="grid gap-8 sm:grid-cols-2">
        {projetos.map((p) => {
          const conteudo = <CartaoInterno projeto={p} />;
          const abrePopup = p.categoria === "site";
          const externo = !abrePopup && p.status === "em-construcao" && p.link;

          return (
            <li key={p.slug}>
              {abrePopup ? (
                <button
                  type="button"
                  onClick={() => abrir(p)}
                  aria-haspopup="dialog"
                  className="card-hover group flex h-full w-full flex-col rounded-[var(--radius-card)] border border-transparent p-2 text-left hover:border-line"
                >
                  {conteudo}
                </button>
              ) : (
                <Link
                  href={externo ? p.link! : `/projetos/#${p.slug}`}
                  {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="card-hover group flex h-full flex-col rounded-[var(--radius-card)] border border-transparent p-2 hover:border-line"
                >
                  {conteudo}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <ModalProjeto projeto={projeto} aberto={aberto} aoFechar={() => setAberto(false)} />
    </>
  );
}

function CartaoInterno({ projeto: p }: { projeto: Projeto }) {
  const externo = p.categoria !== "site" && p.status === "em-construcao" && p.link;
  return (
    <>
      <Moldura
        src={p.telas[0]?.src}
        nome={p.nome}
        endereco={p.link ? new URL(p.link).host : undefined}
        glow={false}
      />
      <div className="flex flex-1 flex-col px-2 pt-6 pb-4">
        <div className="mb-3 flex flex-wrap gap-2">
          <Selo tipo={p.status} />
          {emDev && !p.publicar && <Selo tipo="rascunho" />}
        </div>
        <h3 className="text-[1.35rem]">{p.nome}</h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{p.resumo}</p>
        {p.categoria === "site" && (
          <p className="mt-3 text-sm text-brand">
            Ver apresentação
            <span aria-hidden> &rarr;</span>
          </p>
        )}
        {externo && <p className="mt-3 text-sm text-brand">Ver a versão em andamento no ar &rarr;</p>}
      </div>
    </>
  );
}
