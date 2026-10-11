/* eslint-disable @next/next/no-img-element */
import { equipe } from "@/content/equipe";
import { visiveis, emDev } from "@/lib/publicar";
import { Secao } from "@/components/ui/Secao";
import { Selo } from "@/components/ui/Selo";

export function Equipe() {
  const pessoas = visiveis(equipe);
  if (pessoas.length === 0) return null;

  return (
    <Secao titulo="Quem faz" intro="Uma equipe pequena de Campinas, cada um responsável por uma parte do seu projeto.">
      <ul className="grid gap-6 sm:grid-cols-2">
        {pessoas.map((p) => (
          <li key={p.nome} className="flex gap-4">
            {p.foto ? (
              <img src={p.foto} alt={p.nome} className="size-20 shrink-0 rounded-2xl object-cover" />
            ) : (
              <div className="grid size-20 shrink-0 place-items-center rounded-2xl bg-brand-soft font-display text-3xl font-bold text-brand" aria-hidden>
                {p.nome[0]}
              </div>
            )}
            <div>
              {emDev && !p.publicar && <div className="mb-2"><Selo tipo="rascunho" /></div>}
              <h3 className="text-xl">{p.nome}</h3>
              <p className="text-sm font-medium text-brand">{p.papel}</p>
              <p className="mt-2 text-muted">{p.oQueFaz}</p>
            </div>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
