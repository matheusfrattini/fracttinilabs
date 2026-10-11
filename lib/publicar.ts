/**
 * Regra de segurança do conteúdo.
 *
 * Todo item em /content tem `publicar: boolean`.
 * - Em desenvolvimento (npm run dev) TUDO aparece, com selo "rascunho",
 *   para você enxergar o layout completo.
 * - No build de produção (npm run build) só aparece o que tem
 *   `publicar: true`. Assim nada que está sem autorização do cliente
 *   ou com texto "PREENCHER" vai para o ar por acidente.
 */
export const emDev = process.env.NODE_ENV !== "production";

export function visiveis<T extends { publicar: boolean }>(itens: T[]): T[] {
  return emDev ? itens : itens.filter((i) => i.publicar);
}
