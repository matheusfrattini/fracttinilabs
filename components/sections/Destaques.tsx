import Link from "next/link";
import { projetos } from "@/content/projetos";
import { visiveis, emDev } from "@/lib/publicar";
import { Secao } from "@/components/ui/Secao";
import { Selo } from "@/components/ui/Selo";
import { Botao } from "@/components/ui/Botao";
import { Moldura } from "@/components/ui/Moldura";
import { RevelaGrupo, RevelaItem } from "@/components/motion/RevelaGrupo";

/**
 * Projetos em destaque (ref. 03): cada projeto aparece como um print
 * dentro de uma moldura de navegador.
 *
 * Regra do portfólio (content/projetos.ts):
 *   - finalizado  → demo com dados fictícios;
 *   - em andamento → link para o GitHub Pages do projeto;
 *   - demo de empresa grande → nomes e números trocados.
 */
export function Destaques() {
  const lista = visiveis(projetos.filter((p) => p.emDestaque)).slice(0, 3);
  if (lista.length === 0) return null;

  return (
    <Secao titulo="Alguns trabalhos" intro="Cada projeto começa por um problema real de um negócio real.">
      <RevelaGrupo as="ul" className="grid gap-8 md:grid-cols-3">
        {lista.map((p) => {
          const externo = p.status === "em-construcao" && p.link;
          const destino = externo ? p.link! : `/projetos/#${p.slug}`;
          return (
            <RevelaItem as="li" key={p.slug}>
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
                  <h3 className="text-[1.35rem]">
                    {p.nome}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{p.resumo}</p>
                  {externo && (
                    <p className="mt-3 text-sm text-brand">Ver a versão em andamento no ar &rarr;</p>
                  )}
                </div>
              </Link>
            </RevelaItem>
          );
        })}
      </RevelaGrupo>
      <div className="mt-14">
        <Botao href="/projetos/" variante="secundario">Ver todos os projetos</Botao>
      </div>
    </Secao>
  );
}
