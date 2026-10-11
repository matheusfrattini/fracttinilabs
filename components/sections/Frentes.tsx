import Link from "next/link";
import { frentes } from "@/content/textos";
import { Secao } from "@/components/ui/Secao";
import { Reveal } from "@/components/motion/Reveal";

export function Frentes() {
  return (
    <Secao titulo="O que a gente faz" intro="Três frentes que se conversam. Dá pra começar por uma e somar as outras quando fizer sentido.">
      <ul className="border-t border-line">
        {frentes.map((f, i) => (
          <li key={f.id} className="border-b border-line">
            <Reveal delay={i * 0.06}>
              <Link
                href={`/projetos/?categoria=${f.id}`}
                className="group grid gap-2 py-7 md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:gap-10 md:py-9"
              >
                <h3 className="text-2xl transition-colors group-hover:text-brand sm:text-3xl">{f.titulo}</h3>
                <p className="max-w-xl text-muted">{f.texto}</p>
                <span className="text-sm font-medium text-brand underline-offset-4 group-hover:underline">Ver projetos</span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
