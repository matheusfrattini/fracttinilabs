/**
 * DEPOIMENTOS — só depoimentos reais, com autorização de quem falou.
 * Enquanto a lista estiver vazia, a seção NÃO aparece no site.
 *
 * Exemplo do formato (não descomente com texto inventado):
 * { texto: "...", nome: "Nome", negocio: "Empresa — Cidade", publicar: true },
 */
export type Depoimento = {
  texto: string;
  nome: string;
  negocio: string;
  publicar: boolean;
};

export const depoimentos: Depoimento[] = [];
