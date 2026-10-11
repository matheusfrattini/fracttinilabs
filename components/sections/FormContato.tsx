"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";
import { linkWhatsApp, site } from "@/content/site";
import { projetos } from "@/content/projetos";

/**
 * Formulário sem servidor: monta a mensagem e abre o WhatsApp da empresa
 * com ela pronta. Funciona em hospedagem estática.
 */
const frentesOpcoes = ["Sistema / dashboard de gestão", "Automação de WhatsApp com IA", "Site", "Ainda não sei"];

export function FormContato() {
  const [frente, setFrente] = useState<string[]>([]);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sobre, setSobre] = useState<string | null>(null);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("sobre");
    const p = projetos.find((x) => x.slug === slug);
    if (p) setSobre(p.nome);
  }, []);

  function alternar(op: string) {
    setFrente((f) => (f.includes(op) ? f.filter((x) => x !== op) : [...f, op]));
  }

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    const nome = String(dados.get("nome") || "").trim();
    const negocio = String(dados.get("negocio") || "").trim();
    const problema = String(dados.get("problema") || "").trim();
    if (!nome || !problema) {
      setErro("Preencha seu nome e conte, mesmo que rápido, qual é o problema.");
      return;
    }
    if (site.whatsapp === "PREENCHER") {
      setErro("O número de WhatsApp da empresa ainda não foi configurado em content/site.ts.");
      return;
    }
    setErro(null);
    const linhas = [
      `Olá! Sou ${nome}${negocio ? `, da ${negocio}` : ""}.`,
      sobre ? `Vi o projeto "${sobre}" no site.` : "",
      frente.length ? `Interesse: ${frente.join(", ")}.` : "",
      `O problema: ${problema}`,
    ].filter(Boolean);
    window.open(linkWhatsApp(linhas.join("\n")), "_blank", "noopener");
    setEnviado(true);
  }

  return (
    <div className="rounded-[var(--radius-card)] bg-surface p-5 ring-1 ring-line sm:p-8">
      <AnimatePresence mode="wait">
        {enviado ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-6" role="status">
            <h2 className="text-2xl">Mensagem pronta no WhatsApp</h2>
            <p className="mt-2 text-muted">
              Abrimos o WhatsApp com o seu texto. É só tocar em enviar. Se a janela não abriu, verifique se o navegador bloqueou o pop-up.
            </p>
            <button onClick={() => setEnviado(false)} className="mt-6 text-sm font-medium text-brand underline underline-offset-4">
              Editar mensagem
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={enviar} noValidate className="flex flex-col gap-5">
            {sobre && (
              <p className="rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand">Você veio pelo projeto “{sobre}”.</p>
            )}
            <Campo id="nome" rotulo="Seu nome" autoComplete="name" />
            <Campo id="negocio" rotulo="Nome do negócio" opcional autoComplete="organization" />

            <fieldset>
              <legend className="mb-2 text-[15px] font-medium">O que você procura? <span className="font-normal text-muted">(opcional)</span></legend>
              <div className="flex flex-wrap gap-2">
                {frentesOpcoes.map((op) => {
                  const sel = frente.includes(op);
                  return (
                    <button
                      key={op}
                      type="button"
                      aria-pressed={sel}
                      onClick={() => alternar(op)}
                      className={`min-h-10 rounded-full px-4 text-sm transition-colors ${sel ? "bg-brand text-white" : "bg-paper text-ink ring-1 ring-inset ring-line hover:ring-ink"}`}
                    >
                      {op}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="problema" className="mb-2 block text-[15px] font-medium">Onde o seu negócio trava hoje?</label>
              <textarea
                id="problema"
                name="problema"
                rows={5}
                placeholder="Ex.: perco pedidos no WhatsApp quando estou atendendo no balcão."
                className="w-full rounded-xl bg-paper px-4 py-3 text-base ring-1 ring-inset ring-line outline-none placeholder:text-muted/70 focus:ring-2 focus:ring-brand"
              />
            </div>

            {erro && <p className="text-sm text-[#b42318]" role="alert">{erro}</p>}

            <button type="submit" className="min-h-12 rounded-full bg-brand px-6 font-medium text-white transition-colors hover:bg-ink active:scale-[0.99]">
              Enviar pelo WhatsApp
            </button>
            <p className="text-sm text-muted">A mensagem abre no WhatsApp para você revisar antes de enviar.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Campo({ id, rotulo, opcional, autoComplete }: { id: string; rotulo: string; opcional?: boolean; autoComplete?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[15px] font-medium">
        {rotulo} {opcional && <span className="font-normal text-muted">(opcional)</span>}
      </label>
      <input
        id={id}
        name={id}
        autoComplete={autoComplete}
        className="min-h-12 w-full rounded-xl bg-paper px-4 text-base ring-1 ring-inset ring-line outline-none focus:ring-2 focus:ring-brand"
      />
    </div>
  );
}
