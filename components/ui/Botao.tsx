import Link from "next/link";
import type { ComponentProps } from "react";

type Variante = "primario" | "secundario" | "claro";

const estilos: Record<Variante, string> = {
  primario: "bg-brand text-white hover:bg-ink",
  secundario: "bg-transparent text-ink ring-1 ring-inset ring-line hover:ring-ink",
  claro: "bg-white text-brand hover:bg-brand-soft",
};

type Props = ComponentProps<typeof Link> & { variante?: Variante };

export function Botao({ variante = "primario", className = "", ...props }: Props) {
  return (
    <Link
      {...props}
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-6 text-[15px] font-medium transition-colors duration-200 active:scale-[0.98] ${estilos[variante]} ${className}`}
    />
  );
}
