/**
 * Prefixo de caminho para arquivos de /public.
 *
 * No GitHub Pages o site não mora na raiz do domínio: ele fica em
 * https://<usuario>.github.io/<repo>/. O Next já resolve isso sozinho
 * para <Link>, para as rotas e para os arquivos dele em /_next — mas NÃO
 * para src="/..." escrito na mão nem para arquivo buscado em tempo de
 * execução (o .glb da logo 3D, por exemplo). Esses passam por aqui.
 *
 * NEXT_PUBLIC_BASE_PATH é definido no workflow de deploy. Em
 * desenvolvimento fica vazio e tudo continua na raiz.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** caminho("/3d/logo.png") -> "/fracttinilabs/3d/logo.png" no Pages. */
export function caminho(arquivo: string) {
  if (!arquivo) return arquivo;
  // URL completa (http, https, //) não leva prefixo
  if (/^(https?:)?\/\//.test(arquivo)) return arquivo;
  return `${basePath}${arquivo.startsWith("/") ? "" : "/"}${arquivo}`;
}
