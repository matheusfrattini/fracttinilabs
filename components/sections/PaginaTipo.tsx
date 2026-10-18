import Link from "next/link";
import { emFrase, type Tipo } from "@/content/tipos";
import { projetos } from "@/content/projetos";
import { visiveis, emDev } from "@/lib/publicar";
import { Secao } from "@/components/ui/Secao";
import { Selo } from "@/components/ui/Selo";
import { Moldura } from "@/components/ui/Moldura";
import { Maquina } from "@/components/motion/Maquina";
import { ChamadaFinal } from "./ChamadaFinal";

/** Página de um tipo de projeto: hero, o que resolve, projetos do tipo e chamada. */
export function PaginaTipo({ tipo }: { tipo: Tipo }) {
  const lista = visiveis(projetos.filter((p) => p.categoria === tipo.categoria));

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-16 sm:px-6 md:pt-28 md:pb-24">
        <p className="mb-4 text-xs tracking-[0.14em] text-muted">
          FRACTTINI.LABS
        </p>
        <h1 className="titulo-heroi max-w-3xl">
          {tipo.heroTitulo}
        </h1>
        <Maquina texto={tipo.heroTexto} className="texto-leitura mt-7 text-[17px] leading-relaxed text-muted sm:text-lg" />
      </section>

      <Secao titulo="O que isso resolve">
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <ul className="border-t border-line">
            {tipo.resolve.map((item) => (
              <li key={item} className="flex gap-4 border-b border-line py-6">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                <span className="text-[17px] sm:text-lg">{item}</span>
              </li>
            ))}
          </ul>
          <div>
            <p className="mb-3 text-xs tracking-[0.14em] text-muted">
              PRA QUEM É
            </p>
            <Maquina texto={tipo.paraQuem} className="text-[17px] leading-relaxed sm:text-lg" />
          </div>
        </div>
      </Secao>

      <Secao
        titulo={`Projetos de ${emFrase(tipo.titulo)}`}
        intro={lista.length === 0 ? undefined : "Toque em um projeto pra ver o caso completo."}
      >
        {lista.length === 0 ? (
          <p className="rounded-[var(--radius-card)] border border-dashed border-line bg-surface/40 p-7 font-mono text-sm text-muted">
            [PROJETOS PENDENTES] — nenhum projeto desta frente está publicado ainda.
          </p>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2">
            {lista.map((p) => {
              const externo = p.status === "em-construcao" && p.link;
              const destino = externo ? p.link! : `/projetos/#${p.slug}`;
              return (
                <li key={p.slug}>
                  <Link
                    href={destino}
                    {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="card-hover group flex h-full flex-col rounded-[var(--radius-card)] border border-transparent p-2 hover:border-line"
                  >
                    <Moldura
                      src={p.telas[0]}
                      nome={p.nome}
                      endereco={externo ? new URL(p.link!).host : undefined}
                      glow={false}
                    />
                    <div className="flex flex-1 flex-col px-2 pt-6 pb-4">
                      <div className="mb-3 flex flex-wrap gap-2">
                        <Selo tipo={p.status} />
                        {emDev && !p.publicar && <Selo tipo="rascunho" />}
                      </div>
                      <h3 className="text-[1.35rem]">{p.nome}</h3>
                      <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{p.resumo}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Secao>

      <ChamadaFinal />
    </>
  );
}
