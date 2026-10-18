/* eslint-disable @next/next/no-img-element */

/**
 * Moldura de navegador com glow de gradiente atrás.
 *
 * O print do projeto aparece dentro de uma janela arredondada; atrás dela,
 * um borrão nas cores da marca (.glow-marca em globals.css) separa a
 * imagem do fundo sem precisar de borda grossa nem sombra dura.
 *
 * A moldura inteira é decorativa: quem usa leitor de tela recebe só o
 * alt da imagem.
 */
export function Moldura({
  src,
  nome,
  endereco,
  glow = true,
  className = "",
}: {
  src?: string;
  nome: string;
  endereco?: string;
  /** Desliga o glow quando há várias molduras lado a lado. */
  glow?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative isolate ${className}`}>
      {glow && <span aria-hidden className="glow-marca" />}

      <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[var(--shadow-alta)]">
        {/* barra do navegador */}
        <div className="flex items-center gap-2 border-b border-line px-3 py-2.5" aria-hidden>
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </span>
          <span className="ml-2 flex-1 truncate rounded-full bg-white/[0.04] px-3 py-1 text-center text-[11px] text-muted">
            {endereco ?? "fracttini.labs"}
          </span>
        </div>

        {/* conteúdo */}
        {src ? (
          <img
            src={src}
            alt={`Tela do projeto ${nome}`}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full bg-paper object-cover object-top"
          />
        ) : (
          <div className="grid aspect-[16/10] w-full place-items-center bg-paper text-sm text-muted" aria-hidden>
            tela do projeto
          </div>
        )}
      </div>
    </div>
  );
}
