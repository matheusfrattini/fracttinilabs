import Link from "next/link";
import type { ComponentProps } from "react";

type Variante = "primario" | "secundario" | "claro";

const estilos: Record<Variante, string> = {
  /* pílula branca com texto escuro */
  primario: "bg-ink text-paper hover:bg-white shadow-[var(--shadow-suave)]",
  /* pílula escura com borda fina */
  secundario: "bg-surface/60 text-ink ring-1 ring-inset ring-line hover:ring-[var(--color-line-forte)]",
  /* azul da marca — para quando o acento precisa aparecer */
  claro: "bg-brand text-on-brand hover:bg-brand/90",
};

type Props = ComponentProps<typeof Link> & { variante?: Variante };

export function Botao({ variante = "primario", className = "", ...props }: Props) {
  return (
    <Link
      {...props}
      className={`aperta inline-flex min-h-12 items-center justify-center rounded-full px-6 text-[15px] font-medium transition-colors duration-200 ${estilos[variante]} ${className}`}
    />
  );
}
