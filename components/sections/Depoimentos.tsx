import { depoimentos } from "@/content/depoimentos";
import { visiveis, emDev } from "@/lib/publicar";
import { Secao } from "@/components/ui/Secao";

/**
 * Feedbacks. SÓ depoimentos reais (content/depoimentos.ts).
 *
 * Enquanto não houver nenhum: em desenvolvimento aparecem placeholders
 * bem visíveis [DEPOIMENTO PENDENTE] pra você enxergar o layout;
 * no build de produção a seção inteira some. Nunca escrever depoimento
 * fictício aqui.
 */
export function Depoimentos() {
  const lista = visiveis(depoimentos);

  if (lista.length === 0) {
    if (!emDev) return null;
    return (
      <Secao titulo="Feedbacks" intro="Depoimentos reais de clientes, com autorização de quem falou.">
        <ul className="grid gap-6 md:grid-cols-2">
          {[0, 1].map((i) => (
            <li key={i}>
              <div className="h-full rounded-[var(--radius-card)] border border-dashed border-line bg-surface/40 p-7">
                <p className="font-mono text-sm tracking-wide text-accent">[DEPOIMENTO PENDENTE]</p>
                <p className="mt-3 text-sm text-muted">
                  Adicione em <code className="text-ink">content/depoimentos.ts</code> com{" "}
                  <code className="text-ink">publicar: true</code>. Sem isso, esta seção não vai para o ar.
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Secao>
    );
  }

  return (
    <Secao titulo="Feedbacks">
      <ul className="grid gap-6 md:grid-cols-2">
        {lista.map((d) => (
          <li key={d.nome}>
            <figure className="card-hover h-full rounded-[var(--radius-card)] border border-line bg-surface/40 p-7 hover:border-[var(--color-line-forte)]">
              <blockquote className="text-[17px] leading-relaxed sm:text-lg">“{d.texto}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="text-ink">{d.nome}</span>
                <span className="text-muted"> — {d.negocio}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
