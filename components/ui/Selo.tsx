type Props = { tipo: "no-ar" | "em-construcao" | "rascunho" };

const config = {
  "no-ar": { texto: "No ar", cor: "text-muted ring-1 ring-inset ring-line", ponto: "bg-ok" },
  "em-construcao": { texto: "Em construção", cor: "text-muted ring-1 ring-inset ring-line", ponto: "bg-accent" },
  rascunho: { texto: "Rascunho — não publicado", cor: "bg-ink text-paper", ponto: "bg-paper" },
};

export function Selo({ tipo }: Props) {
  const c = config[tipo];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${c.cor}`}>
      <span className={`size-1.5 rounded-full ${c.ponto}`} aria-hidden />
      {c.texto}
    </span>
  );
}
