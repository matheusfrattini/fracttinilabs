import { Botao } from "@/components/ui/Botao";

export default function NaoEncontrada() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h1 className="text-4xl sm:text-6xl">Essa página não existe</h1>
      <p className="mt-4 text-lg text-muted">O endereço pode ter mudado. Volte para o início ou veja nossos projetos.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Botao href="/">Ir para o início</Botao>
        <Botao href="/projetos/" variante="secundario">Ver projetos</Botao>
      </div>
    </section>
  );
}
