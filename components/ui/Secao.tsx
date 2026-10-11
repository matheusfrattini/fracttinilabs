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
    <section id={id} className={`mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24 ${className}`}>
      {titulo && (
        <header className="mb-10 max-w-2xl md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl">{titulo}</h2>
          {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
