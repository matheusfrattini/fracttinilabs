import { depoimentos } from "@/content/depoimentos";
import { visiveis } from "@/lib/publicar";
import { Secao } from "@/components/ui/Secao";

/** Só aparece quando houver depoimento real em content/depoimentos.ts */
export function Depoimentos() {
  const lista = visiveis(depoimentos);
  if (lista.length === 0) return null;

  return (
    <Secao titulo="O que dizem os clientes">
      <ul className="grid gap-6 md:grid-cols-2">
        {lista.map((d) => (
          <li key={d.nome}>
            <figure className="h-full rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line">
              <blockquote className="text-lg leading-relaxed">“{d.texto}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{d.nome}</span>
                <span className="text-muted"> — {d.negocio}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
