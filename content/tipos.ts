/**
 * TIPOS DE PROJETO — cada item vira um card na home (motion #08)
 * e uma página própria (/dashboards, /automacoes, /sites).
 *
 * `categoria` casa com a categoria usada em content/projetos.ts,
 * para a página do tipo listar os projetos daquele tipo.
 */
import type { Categoria } from "./projetos";

export type Tipo = {
  slug: string;
  categoria: Categoria;
  titulo: string;
  /** Nome curto, para caber no botão do card em uma linha só. */
  rotuloCurto: string;
  /** Frase curta do card, parado. */
  chamada: string;
  /** Texto que aparece no hover do card. */
  descricao: string;
  /** Hero da página do tipo. */
  heroTitulo: string;
  heroTexto: string;
  /** O que resolve / pra quem é. */
  resolve: string[];
  paraQuem: string;
  /** Card que já começa aberto na home. */
  aberto?: boolean;
};

export const tipos: Tipo[] = [
  {
    slug: "dashboards",
    categoria: "dashboard",
    titulo: "Sistemas e dashboards",
    rotuloCurto: "dashboards",
    chamada: "Seus números num lugar só",
    descricao:
      "Vendas, estoque, caixa e clientes num painel só, montado em cima de como o seu negócio já funciona — não o contrário. Com IA em cima dos seus próprios dados.",
    heroTitulo: "Sistemas e dashboards",
    heroTexto:
      "Um painel que mostra o que está acontecendo no seu negócio agora, sem você precisar abrir cinco planilhas pra descobrir.",
    resolve: [
      "Número que só existe na cabeça de uma pessoa",
      "Planilha que trava, duplica e ninguém mais entende",
      "Decisão tomada no achismo porque o dado demora pra chegar",
      "Relatório que leva meio dia pra montar toda semana",
    ],
    paraQuem:
      "Pra quem já vende o bastante pra não conseguir mais acompanhar tudo de cabeça, mas ainda não tem um sistema que caiba no tamanho do negócio.",
    aberto: true,
  },
  {
    slug: "automacoes",
    categoria: "automacao",
    titulo: "Automações com IA",
    rotuloCurto: "automações",
    chamada: "O atendimento não dorme",
    descricao:
      "Atendimento no WhatsApp que responde, organiza pedidos e entrega o contato pronto pra você fechar — inclusive fora do horário.",
    heroTitulo: "Automações com IA",
    heroTexto:
      "A parte repetitiva do atendimento roda sozinha. Você entra quando a conversa já vale o seu tempo.",
    resolve: [
      "Cliente que pergunta e some porque ninguém respondeu a tempo",
      "Pedido perdido no meio de duzentas conversas",
      "Mesma dúvida respondida vinte vezes por dia",
      "Atendimento que para quando você para",
    ],
    paraQuem:
      "Pra quem vende pelo WhatsApp e atende sozinho ou com equipe pequena, e já perdeu venda por demora na resposta.",
  },
  {
    slug: "web-design",
    categoria: "site",
    titulo: "Web design",
    rotuloCurto: "web design",
    chamada: "Do Instagram pro contato",
    descricao:
      "Sites rápidos no celular, feitos pra quem chega pelo Instagram entender o que você faz e falar com você em poucos segundos.",
    heroTitulo: "Web design",
    heroTexto:
      "Seu site é a segunda tela que a pessoa vê depois do seu perfil. Ele tem poucos segundos pra explicar o que você faz e abrir uma conversa.",
    resolve: [
      "Link na bio que leva pra lugar nenhum",
      "Site que demora pra abrir no 4G e perde a pessoa antes do primeiro scroll",
      "Visitante que entende o que você faz mas não acha como falar com você",
      "Página bonita no computador e quebrada no celular",
    ],
    paraQuem:
      "Pra quem traz gente do Instagram e precisa de uma página que converta essa visita em conversa.",
  },
  {
    slug: "aplicativos",
    categoria: "app",
    titulo: "Aplicativos e softwares",
    rotuloCurto: "aplicativos",
    chamada: "Quando o site não dá conta",
    descricao:
      "Aplicativo ou sistema sob medida pra quando o seu processo não cabe em planilha nem em ferramenta de prateleira — feito do jeito que o seu negócio funciona.",
    heroTitulo: "Aplicativos e softwares",
    heroTexto:
      "Tem processo que nenhuma ferramenta pronta resolve direito. Aí a saída é construir um software que nasce do jeito que o seu negócio já trabalha.",
    resolve: [
      "Processo que só funciona porque alguém lembra de cada passo",
      "Três ferramentas diferentes pra dar conta de um fluxo só",
      "Ferramenta de prateleira que cobra por função que você nunca usa",
      "Equipe em campo sem um app pra registrar o que aconteceu na hora",
    ],
    paraQuem:
      "Pra quem já tentou encaixar o negócio numa ferramenta pronta e percebeu que gasta mais tempo contornando ela do que trabalhando.",
  },
];

/**
 * Minúscula só na primeira letra, para encaixar o título no meio de uma
 * frase sem destruir sigla: "Automações com IA" -> "automações com IA".
 */
export function emFrase(titulo: string) {
  return titulo.charAt(0).toLowerCase() + titulo.slice(1);
}

export function tipoPorSlug(slug: string) {
  return tipos.find((t) => t.slug === slug);
}
