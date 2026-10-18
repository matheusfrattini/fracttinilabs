/**
 * PROJETOS — cada item vira um caso na página /projetos.
 *
 * Estrutura de cada caso (inspirada no PeekCode):
 *   problema     → o que travava o negócio do cliente (específico!)
 *   oQueFizemos  → itens curtos e verificáveis
 *   destaque     → uma decisão técnica explicada em linguagem de negócio
 *   notaStatus   → nota honesta quando o projeto não está 100% no ar
 *
 * Regras:
 *   - Nada de dor, número ou resultado inventado.
 *   - `publicar: true` só quando o cliente autorizou E o texto está pronto.
 *   - Telas vão em /public/projetos/<slug>/ e são listadas em `telas`.
 *   - `emDestaque: true` faz o projeto aparecer também no Início.
 */

export type Categoria = "dashboard" | "site" | "automacao" | "app";

export type Projeto = {
  slug: string;
  nome: string;
  resumo: string;
  tipo: string;
  categoria: Categoria;
  status: "no-ar" | "em-construcao";
  notaStatus?: string;
  ano: number;
  cidade?: string;
  problema: string;
  oQueFizemos: string[];
  destaque?: { titulo: string; texto: string };
  telas: string[];
  link?: string;
  emDestaque?: boolean;
  publicar: boolean;
};

export const categorias: { id: Categoria | "todos"; rotulo: string }[] = [
  { id: "todos", rotulo: "Todos" },
  { id: "dashboard", rotulo: "Sistemas e dashboards" },
  { id: "automacao", rotulo: "Automações com IA" },
  { id: "site", rotulo: "Web design" },
  { id: "app", rotulo: "Aplicativos e softwares" },
];

const vazio = {
  resumo: "PREENCHER: uma frase que resume o projeto",
  tipo: "PREENCHER",
  ano: 2026,
  problema: "PREENCHER: o que travava o negócio do cliente, com contexto real.",
  oQueFizemos: ["PREENCHER: entrega 1", "PREENCHER: entrega 2", "PREENCHER: entrega 3"],
  telas: [] as string[],
  publicar: false,
};

export const projetos: Projeto[] = [
  // ---- 3 DASHBOARDS ----
  { ...vazio, slug: "dashboard-1", nome: "PREENCHER — Dashboard 1", categoria: "dashboard", status: "no-ar", emDestaque: true },
  { ...vazio, slug: "dashboard-2", nome: "PREENCHER — Dashboard 2", categoria: "dashboard", status: "no-ar" },
  { ...vazio, slug: "dashboard-3", nome: "PREENCHER — Dashboard 3", categoria: "dashboard", status: "no-ar" },

  // ---- 2 SITES (1 entregue, 1 em andamento) ----
  { ...vazio, slug: "site-1", nome: "PREENCHER — Site entregue", categoria: "site", status: "no-ar", emDestaque: true },
  {
    ...vazio,
    slug: "site-2",
    nome: "PREENCHER — Site em andamento",
    categoria: "site",
    status: "em-construcao",
    notaStatus: "PREENCHER: o que já está pronto e o que falta.",
  },

  // ---- AUTOMAÇÕES ENTREGUES ----
  { ...vazio, slug: "automacao-1", nome: "PREENCHER — Automação 1", categoria: "automacao", status: "no-ar", emDestaque: true },
  { ...vazio, slug: "automacao-2", nome: "PREENCHER — Automação 2", categoria: "automacao", status: "no-ar" },
];
