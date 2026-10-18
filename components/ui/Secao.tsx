import type { ReactNode } from "react";

type Props = {
  id?: string;
  titulo?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
};

/** Container padrão de seção: largura, respiro lateral (16px no celular) e título. */
export function Secao({ id, titulo, intro, children, className = "" }: Props) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 md:py-36 ${className}`}>
      {titulo && (
        <header className="mb-14 md:mb-20">
          <h2 className="titulo-secao max-w-3xl">{titulo}</h2>
          {intro && <p className="texto-leitura mt-5 text-lg text-muted">{intro}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
