/**
 * JORNADA "ONDE O SEU NEGÓCIO TRAVA" — dor -> custo da inação -> solução.
 *
 * Três etapas, cada uma com uma PERGUNTA que a pessoa reconhece e uma
 * RESPOSTA curta. A ordem importa: sem a etapa do custo, a dor vira só
 * desabafo e a solução vira só propaganda.
 *
 * REGRA DE CONTEÚDO: nada de número inventado aqui. "Custo da inação"
 * normalmente se escreve com estatística ("você perde R$ X por mês") —
 * enquanto não houver número REAL de um projeto, o custo é escrito em
 * consequência concreta: tempo, venda que esfria, gente presa na tarefa.
 * Se um dia entrar número, ele vem com fonte e com o cliente autorizando.
 */
export type Etapa = {
  id: "dor" | "custo" | "solucao";
  /** Rótulo pequeno em caixa alta. */
  rotulo: string;
  pergunta: string;
  resposta: string;
  /** Só na primeira etapa: frases curtas que o público reconhece. */
  sintomas?: string[];
};

export const jornada: Etapa[] = [
  {
    id: "dor",
    rotulo: "A DOR",
    pergunta: "Quanto do seu dia vai embora refazendo a mesma coisa?",
    resposta:
      "Juntar número que está em três lugares. Responder a mesma pergunta pela décima vez. Montar o relatório no domingo à noite. Nada disso aparece como problema no fim do mês — aparece como cansaço.",
    sintomas: ["Planilha que ninguém entende", "WhatsApp lotado", "Fazendo tudo sozinho"],
  },
  {
    id: "custo",
    rotulo: "O CUSTO DE DEIXAR COMO ESTÁ",
    pergunta: "E se ficar assim por mais um ano?",
    resposta:
      "O trabalho repetido cresce junto com o negócio. Chega num ponto em que contratar mais gente só aumenta o número de pessoas presas na mesma tarefa — e a venda que esfriou porque ninguém respondeu a tempo você nem fica sabendo que existiu.",
  },
  {
    id: "solucao",
    rotulo: "A SAÍDA",
    pergunta: "Como a gente resolve?",
    resposta:
      "Primeiro a gente escuta e vai um passo atrás, até achar onde o tempo está vazando de verdade. Depois constrói um sistema do tamanho do seu negócio hoje, que você opera sozinho e que cresce junto quando o negócio crescer.",
  },
];
