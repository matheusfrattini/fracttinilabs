import { TextoPintado } from "@/components/motion/TextoPintado";
import { Moldura } from "@/components/ui/Moldura";

/**
 * Seção no layout da ref. 04-secao-innovation-x-vision.png:
 * título grande com um conector em itálico e cinza, imagem à esquerda
 * e, à direita, blocos de texto com rótulo pequeno em caixa alta,
 * separados por linhas.
 *
 * Conteúdo: o posicionamento "valor, não preço" — a diferença entre
 * o problema que a pessoa traz e o sistema que resolve.
 * O texto dos blocos usa o motion #07 (pinta conforme a rolagem).
 */
const blocos = [
  {
    rotulo: "O PROBLEMA QUE VOCÊ TRAZ",
    texto:
      "Quase sempre a primeira frase é sobre uma ferramenta: um site, uma planilha, um robô de WhatsApp. A gente escuta e vai um passo atrás, até achar onde o dinheiro e o tempo estão vazando de verdade.",
  },
  {
    rotulo: "O PROBLEMA QUE A GENTE ACHA",
    texto:
      "É aí que aparece o que ninguém tinha olhado: o pedido que se perde entre o balcão e a cozinha, o relatório que só uma pessoa sabe montar, a venda que esfria porque a resposta demorou duas horas.",
  },
  {
    rotulo: "O QUE SAI DISSO",
    texto:
      "Um sistema do tamanho do seu negócio hoje, que você entende e consegue operar sozinho, e que cresce junto quando o negócio crescer. Nada de pacote pronto que sobra de um lado e falta do outro.",
  },
];

export function ProblemaSistema() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 md:py-36">
      <h2 className="titulo-heroi">
        Problema{" "}
        <span className="font-serif text-muted italic">x</span>{" "}
        Sistema
      </h2>

      <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-2 md:gap-20">
        <div className="md:sticky md:top-28 md:self-start">
          <Moldura
            nome="exemplo de painel da fracttini.labs"
            endereco="painel.fracttini.labs"
            className="w-full"
          />
          <p className="mt-3 text-sm text-muted">
            Exemplo ilustrativo de painel. [PRINT PENDENTE]
          </p>
        </div>

        <ul>
          {blocos.map((b, i) => (
            <li key={b.rotulo} className={i > 0 ? "mt-10 border-t border-line pt-10" : ""}>
              <p className="mb-4 text-xs tracking-[0.14em] text-muted">
                {b.rotulo}
              </p>
              <TextoPintado texto={b.texto} className="text-[17px] leading-relaxed text-ink sm:text-lg" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
