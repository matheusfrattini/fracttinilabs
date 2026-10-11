import Link from "next/link";
import { projetos } from "@/content/projetos";
import { visiveis, emDev } from "@/lib/publicar";
import { Secao } from "@/components/ui/Secao";
import { Selo } from "@/components/ui/Selo";
import { Botao } from "@/components/ui/Botao";
import { TelaProjeto } from "@/components/ui/TelaProjeto";

export function Destaques() {
  const lista = visiveis(projetos.filter((p) => p.emDestaque)).slice(0, 3);
  if (lista.length === 0) return null;

  return (
    <Secao titulo="Alguns trabalhos" intro="Cada projeto começa por um problema real de um negócio real.">
      <div className="grid gap-6 md:grid-cols-3">
        {lista.map((p) => (
          <Link
            key={p.slug}
            href={`/projetos/#${p.slug}`}
            className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-surface ring-1 ring-line transition-shadow hover:shadow-[0_12px_40px_-16px_rgba(31,58,110,0.35)]"
          >
            <TelaProjeto src={p.telas[0]} nome={p.nome} />
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                <Selo tipo={p.status} />
                {emDev && !p.publicar && <Selo tipo="rascunho" />}
              </div>
              <h3 className="text-xl">{p.nome}</h3>
              <p className="mt-2 text-muted">{p.resumo}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10">
        <Botao href="/projetos/" variante="secundario">Ver todos os projetos</Botao>
      </div>
    </Secao>
  );
}
