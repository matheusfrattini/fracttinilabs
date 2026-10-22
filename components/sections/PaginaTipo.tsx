import { emFrase, type Tipo } from "@/content/tipos";
import { projetos } from "@/content/projetos";
import { visiveis } from "@/lib/publicar";
import { Secao } from "@/components/ui/Secao";
import { GradeProjetos } from "./GradeProjetos";
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
          <GradeProjetos projetos={lista} />
        )}
      </Secao>

      <ChamadaFinal />
    </>
  );
}
