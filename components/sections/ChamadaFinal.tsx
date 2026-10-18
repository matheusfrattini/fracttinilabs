import { Botao } from "@/components/ui/Botao";
import { Flutuante } from "@/components/visual/Flutuante";

export function ChamadaFinal() {
  return (
    <section className="px-4 pb-24 sm:px-6 md:pb-36">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-line bg-surface/40 px-6 py-20 sm:px-14 md:py-28">
        <div aria-hidden className="absolute -top-32 -right-24 size-96 rounded-full bg-brand/20 blur-[90px]" />
        <div className="relative grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="titulo-secao max-w-2xl">Onde o seu negócio trava hoje?</h2>
            <p className="texto-leitura mt-5 text-[17px] leading-relaxed text-muted">
              Conta pra gente em poucas linhas. A primeira conversa é pra entender o problema — sem compromisso e sem pacote pronto.
            </p>
            <div className="mt-10">
              <Botao href="/contato/">Nos conta o problema</Botao>
            </div>
          </div>
          {/* "dores" soltas: frases curtas que o público reconhece */}
          <div aria-hidden className="relative hidden h-56 md:block">
            <Flutuante fase={0.2} className="absolute top-0 left-4"><Dor texto="Planilha que ninguém entende" /></Flutuante>
            <Flutuante fase={0.6} className="absolute top-20 right-0"><Dor texto="WhatsApp lotado" /></Flutuante>
            <Flutuante fase={0.9} className="absolute bottom-0 left-10"><Dor texto="Fazendo tudo sozinho" /></Flutuante>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dor({ texto }: { texto: string }) {
  return (
    <span className="inline-block rounded-full bg-surface px-4 py-2 text-sm text-muted ring-1 ring-inset ring-line">{texto}</span>
  );
}
