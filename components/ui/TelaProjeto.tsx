/* eslint-disable @next/next/no-img-element */

/** Mostra a tela do projeto ou, sem imagem ainda, uma moldura neutra. */
export function TelaProjeto({ src, nome }: { src?: string; nome: string }) {
  if (!src) {
    return (
      <div className="grid aspect-[16/10] place-items-center bg-brand-soft text-sm text-brand/70" aria-hidden>
        tela do projeto
      </div>
    );
  }
  return <img src={src} alt={`Tela do projeto ${nome}`} loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />;
}
