"use client";

import { useId } from "react";
import type { Projeto } from "@/content/projetos";
import { Modal } from "@/components/ui/Modal";
import { Carrossel } from "@/components/ui/Carrossel";
import { Selo } from "@/components/ui/Selo";
import { emDev } from "@/lib/publicar";

/**
 * Pop-up de apresentação de um projeto: carrossel das telas, o problema
 * do cliente, o que foi entregue e o link para o site no ar.
 *
 * Todo texto vem de content/projetos.ts. Campo que ainda não foi
 * preenchido aparece como aviso em vez de sumir — assim dá pra ver o que
 * falta enquanto o caso está em rascunho.
 */
export function ModalProjeto({
  projeto,
  aberto,
  aoFechar,
}: {
  projeto: Projeto | null;
  aberto: boolean;
  aoFechar: () => void;
}) {
  const idTitulo = useId();
  if (!projeto) return null;

  const p = projeto;
  const temEntregas = p.oQueFizemos.some((x) => !x.startsWith("PREENCHER"));
  const temProblema = Boolean(p.problema) && !p.problema.startsWith("PREENCHER");

  return (
    <Modal aberto={aberto} aoFechar={aoFechar} idTitulo={idTitulo}>
      <div className="p-5 sm:p-8">
        <div className="mb-5 flex flex-wrap items-center gap-2 pr-12">
          <Selo tipo={p.status} />
          {emDev && !p.publicar && <Selo tipo="rascunho" />}
          {p.ano ? <span className="text-sm text-muted">{p.ano}</span> : null}
        </div>

        <h2 id={idTitulo} className="text-2xl leading-snug sm:text-[1.9rem]">
          {p.nome}
        </h2>
        {p.resumo && !p.resumo.startsWith("PREENCHER") && (
          <p className="texto-leitura mt-2 text-[15px] leading-relaxed text-muted">{p.resumo}</p>
        )}

        <div className="mt-6">
          <Carrossel telas={p.telas} nome={p.nome} />
        </div>

        <div className="mt-8 grid gap-7 md:grid-cols-2 md:gap-10">
          <section>
            <h3 className="mb-3 text-xs tracking-[0.14em] text-muted">O PROBLEMA DO CLIENTE</h3>
            {temProblema ? (
              <p className="text-[15px] leading-relaxed text-ink">{p.problema}</p>
            ) : (
              <p className="rounded-xl border border-dashed border-line p-3 font-mono text-sm text-muted">
                [TEXTO DE DOR PENDENTE]
              </p>
            )}
          </section>

          <section>
            <h3 className="mb-3 text-xs tracking-[0.14em] text-muted">O QUE FOI ENTREGUE</h3>
            {temEntregas ? (
              <ul className="space-y-2.5">
                {p.oQueFizemos.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-xl border border-dashed border-line p-3 font-mono text-sm text-muted">
                [ENTREGAS PENDENTES]
              </p>
            )}
          </section>
        </div>

        {p.destaque && !p.destaque.titulo.startsWith("PREENCHER") && (
          <section className="mt-7 rounded-xl border border-line bg-white/[0.02] p-5">
            <h3 className="text-[15px] text-ink">{p.destaque.titulo}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.destaque.texto}</p>
          </section>
        )}

        {p.notaStatus && !p.notaStatus.startsWith("PREENCHER") && (
          <p className="mt-6 text-sm leading-relaxed text-muted">{p.notaStatus}</p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="aperta inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-6 text-[15px] font-medium text-paper transition-colors hover:bg-white"
            >
              Ver site ao vivo
            </a>
          )}
          <a
            href={`/contato/?sobre=${p.slug}`}
            className="aperta inline-flex min-h-12 items-center justify-center rounded-full border border-line px-6 text-[15px] text-ink transition-colors hover:border-[var(--color-line-forte)]"
          >
            Quero algo assim
          </a>
        </div>
      </div>
    </Modal>
  );
}
