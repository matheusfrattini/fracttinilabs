import { Botao } from "@/components/ui/Botao";

export function ChamadaFinal() {
  return (
    <section className="px-4 pb-16 sm:px-6 md:pb-24">
      <div className="mx-auto max-w-6xl rounded-[1.75rem] bg-brand px-6 py-12 text-white sm:px-12 md:py-16">
        <h2 className="max-w-2xl text-3xl sm:text-5xl">Onde o seu negócio trava hoje?</h2>
        <p className="mt-4 max-w-xl text-lg text-white/75">
          Conta pra gente em poucas linhas. A primeira conversa é pra entender o problema — sem compromisso e sem pacote pronto.
        </p>
        <div className="mt-8">
          <Botao href="/contato/" variante="claro">Nos conta o problema</Botao>
        </div>
      </div>
    </section>
  );
}
