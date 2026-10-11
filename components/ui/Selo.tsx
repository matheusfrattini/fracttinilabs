type Props = { tipo: "no-ar" | "em-construcao" | "rascunho" };

const config = {
  "no-ar": { texto: "No ar", cor: "bg-ok/10 text-ok", ponto: "bg-ok" },
  "em-construcao": { texto: "Em construção", cor: "bg-accent/10 text-[#a8501c]", ponto: "bg-accent" },
  rascunho: { texto: "Rascunho — não publicado", cor: "bg-ink text-white", ponto: "bg-white" },
};

export function Selo({ tipo }: Props) {
  const c = config[tipo];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${c.cor}`}>
      <span className={`size-1.5 rounded-full ${c.ponto}`} aria-hidden />
      {c.texto}
    </span>
  );
}
