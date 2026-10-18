"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";
import { linkWhatsApp, site } from "@/content/site";
import { projetos } from "@/content/projetos";
import { tipos } from "@/content/tipos";

/**
 * Formulário "Nos conta o problema".
 *
 * Sem servidor (o site é estático): monta a mensagem e abre o WhatsApp
 * da empresa com ela pronta — a pessoa revisa e envia. É a regra do
 * CLAUDE.md. Trocar para e-mail/planilha exige um backend.
 *
 * Validação no próprio campo, máscara de telefone brasileiro,
 * estado de envio, mensagem de sucesso e mensagem de erro.
 */
const negocios = [
  "Comércio / loja",
  "Alimentação",
  "Serviços",
  "Saúde e bem-estar",
  "Educação",
  "Outro",
];

type Erros = Partial<Record<"nome" | "whatsapp" | "email" | "problema", string>>;

/** (19) 99999-9999 */
function mascaraTelefone(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function FormContato() {
  const [tipoSel, setTipoSel] = useState<string[]>([]);
  const [telefone, setTelefone] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [erroGeral, setErroGeral] = useState<string | null>(null);
  const [estado, setEstado] = useState<"parado" | "enviando" | "ok">("parado");
  const [sobre, setSobre] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = projetos.find((x) => x.slug === params.get("sobre"));
    if (p) setSobre(p.nome);
    const t = tipos.find((x) => x.slug === params.get("tipo"));
    if (t) setTipoSel([t.titulo]);
  }, []);

  function alternar(op: string) {
    setTipoSel((f) => (f.includes(op) ? f.filter((x) => x !== op) : [...f, op]));
  }

  function validar(d: FormData): Erros {
    const e: Erros = {};
    const nome = String(d.get("nome") || "").trim();
    const email = String(d.get("email") || "").trim();
    const problema = String(d.get("problema") || "").trim();
    const digitos = telefone.replace(/\D/g, "");

    if (nome.length < 2) e.nome = "Escreva seu nome.";
    if (digitos.length < 10) e.whatsapp = "Informe DDD + número. Ex.: (19) 99999-9999.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) e.email = "Esse e-mail não parece válido.";
    if (problema.length < 10) e.problema = "Conta um pouco mais — pelo menos uma frase.";
    return e;
  }

  function enviar(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const dados = new FormData(ev.currentTarget);
    const achados = validar(dados);
    setErros(achados);

    if (Object.keys(achados).length > 0) {
      setErroGeral("Faltou alguma coisa. Veja os campos marcados abaixo.");
      document.getElementById(Object.keys(achados)[0])?.focus();
      return;
    }
    if (site.whatsapp === "PREENCHER") {
      setErroGeral("O número de WhatsApp da empresa ainda não foi configurado em content/site.ts.");
      return;
    }

    setErroGeral(null);
    setEstado("enviando");

    const negocio = String(dados.get("negocio") || "").trim();
    const ramo = String(dados.get("ramo") || "").trim();
    const email = String(dados.get("email") || "").trim();

    const linhas = [
      `Olá! Sou ${String(dados.get("nome")).trim()}${negocio ? `, da ${negocio}` : ""}.`,
      ramo ? `Ramo: ${ramo}.` : "",
      sobre ? `Vi o projeto "${sobre}" no site.` : "",
      tipoSel.length ? `Interesse: ${tipoSel.join(", ")}.` : "",
      `WhatsApp: ${telefone}`,
      email ? `E-mail: ${email}` : "",
      "",
      `O problema: ${String(dados.get("problema")).trim()}`,
    ].filter(Boolean);

    const janela = window.open(linkWhatsApp(linhas.join("\n")), "_blank", "noopener");
    if (!janela) {
      setEstado("parado");
      setErroGeral("O navegador bloqueou a janela do WhatsApp. Libere o pop-up e tente de novo.");
      return;
    }
    setEstado("ok");
  }

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-surface/40 p-5 sm:p-8">
      <AnimatePresence mode="wait">
        {estado === "ok" ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-6" role="status">
            <h2 className="text-2xl">Mensagem pronta no WhatsApp</h2>
            <p className="mt-2 text-muted">
              Abrimos o WhatsApp com o seu texto. É só tocar em enviar. Se a janela não abriu, verifique se o navegador bloqueou o pop-up.
            </p>
            <button onClick={() => setEstado("parado")} className="sublinha mt-6 text-sm font-medium text-brand">
              Editar mensagem
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={enviar} noValidate className="flex flex-col gap-5">
            {sobre && (
              <p className="rounded-xl bg-brand-soft px-4 py-3 text-sm text-brand">Você veio pelo projeto “{sobre}”.</p>
            )}

            <Campo id="nome" rotulo="Seu nome" autoComplete="name" erro={erros.nome} />

            <div>
              <label htmlFor="whatsapp" className="mb-2 block text-[15px] font-medium">WhatsApp</label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="(19) 99999-9999"
                value={telefone}
                onChange={(e) => setTelefone(mascaraTelefone(e.target.value))}
                aria-invalid={Boolean(erros.whatsapp)}
                aria-describedby={erros.whatsapp ? "erro-whatsapp" : undefined}
                className={`min-h-12 w-full rounded-xl bg-white/[0.03] px-4 text-base ring-1 ring-inset outline-none focus:ring-2 ${erros.whatsapp ? "ring-erro focus:ring-erro" : "ring-line focus:ring-brand"}`}
              />
              {erros.whatsapp && <p id="erro-whatsapp" className="mt-1.5 text-sm text-erro">{erros.whatsapp}</p>}
            </div>

            <Campo id="email" rotulo="E-mail" tipo="email" opcional autoComplete="email" erro={erros.email} />
            <Campo id="negocio" rotulo="Nome do negócio" opcional autoComplete="organization" />

            <div>
              <label htmlFor="ramo" className="mb-2 block text-[15px] font-medium">
                Tipo de negócio <span className="font-normal text-muted">(opcional)</span>
              </label>
              <select
                id="ramo"
                name="ramo"
                defaultValue=""
                className="min-h-12 w-full rounded-xl bg-white/[0.03] px-4 text-base ring-1 ring-inset ring-line outline-none focus:ring-2 focus:ring-brand"
              >
                <option value="">Selecione</option>
                {negocios.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>

            <fieldset>
              <legend className="mb-2 text-[15px] font-medium">
                Tipo de projeto <span className="font-normal text-muted">(opcional)</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {[...tipos.map((t) => t.titulo), "Ainda não sei"].map((op) => {
                  const sel = tipoSel.includes(op);
                  return (
                    <button
                      key={op}
                      type="button"
                      aria-pressed={sel}
                      onClick={() => alternar(op)}
                      className={`min-h-11 rounded-full px-4 text-sm transition-colors ${sel ? "bg-ink text-paper" : "bg-transparent text-muted ring-1 ring-inset ring-line hover:text-ink hover:ring-[var(--color-line-forte)]"}`}
                    >
                      {op}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="problema" className="mb-2 block text-[15px] font-medium">Qual problema você quer resolver?</label>
              <textarea
                id="problema"
                name="problema"
                rows={5}
                placeholder="Ex.: perco pedidos no WhatsApp quando estou atendendo no balcão."
                aria-invalid={Boolean(erros.problema)}
                aria-describedby={erros.problema ? "erro-problema" : undefined}
                className={`w-full rounded-xl bg-white/[0.03] px-4 py-3 text-base ring-1 ring-inset outline-none placeholder:text-muted/70 focus:ring-2 ${erros.problema ? "ring-erro focus:ring-erro" : "ring-line focus:ring-brand"}`}
              />
              {erros.problema && <p id="erro-problema" className="mt-1.5 text-sm text-erro">{erros.problema}</p>}
            </div>

            {erroGeral && <p className="rounded-xl bg-erro/10 px-4 py-3 text-sm text-erro" role="alert">{erroGeral}</p>}

            <button
              type="submit"
              disabled={estado === "enviando"}
              className="aperta min-h-12 rounded-full bg-ink px-6 font-medium text-paper transition-colors hover:bg-white disabled:opacity-60"
            >
              {estado === "enviando" ? "Abrindo o WhatsApp…" : "Enviar pelo WhatsApp"}
            </button>
            <p className="text-sm text-muted">A mensagem abre no WhatsApp para você revisar antes de enviar.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Campo({
  id,
  rotulo,
  opcional,
  autoComplete,
  tipo = "text",
  erro,
}: {
  id: string;
  rotulo: string;
  opcional?: boolean;
  autoComplete?: string;
  tipo?: string;
  erro?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[15px] font-medium">
        {rotulo} {opcional && <span className="font-normal text-muted">(opcional)</span>}
      </label>
      <input
        id={id}
        name={id}
        type={tipo}
        autoComplete={autoComplete}
        aria-invalid={Boolean(erro)}
        aria-describedby={erro ? `erro-${id}` : undefined}
        className={`min-h-12 w-full rounded-xl bg-white/[0.03] px-4 text-base ring-1 ring-inset outline-none focus:ring-2 ${erro ? "ring-erro focus:ring-erro" : "ring-line focus:ring-brand"}`}
      />
      {erro && <p id={`erro-${id}`} className="mt-1.5 text-sm text-erro">{erro}</p>}
    </div>
  );
}
