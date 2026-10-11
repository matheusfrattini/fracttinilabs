import { processo } from "@/content/textos";
import { Secao } from "@/components/ui/Secao";
import { Reveal } from "@/components/motion/Reveal";

/** Aqui mora o "valor, não preço": como a gente trabalha com o cliente. */
export function Processo() {
  return (
    <div className="bg-surface">
      <Secao
        titulo="Como a gente trabalha"
        intro="Não vendemos pacote pronto. O sistema tem que caber no seu negócio e crescer junto com ele."
      >
        <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {processo.map((etapa, i) => (
            <li key={etapa.titulo}>
              <Reveal delay={i * 0.08}>
                <span className="font-display text-5xl font-bold text-brand/20">{i + 1}</span>
                <h3 className="mt-3 text-xl">{etapa.titulo}</h3>
                <p className="mt-2 text-muted">{etapa.texto}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Secao>
    </div>
  );
}
