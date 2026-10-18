import Link from "next/link";
import { navegacao, site, preenchido } from "@/content/site";
import { Logo } from "./Logo";

/**
 * Rodapé no padrão da ref. 02-rodape-axis.png:
 * bloco centralizado (logo, links, redes, copyright), uma linha
 * divisória e, abaixo, uma barra inferior —
 * esquerda: botão de WhatsApp. direita: cidade.
 *
 * Rede social só aparece quando o link está preenchido em content/site.ts.
 */
const redes = [
  {
    nome: "Instagram",
    href: () => site.instagram,
    path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.2 1 .5 1.4.9s.7.8.9 1.4c.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.2.6-.5 1-.9 1.4s-.8.7-1.4.9c-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.2-1-.5-1.4-.9s-.7-.8-.9-1.4c-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.2-.6.5-1 .9-1.4s.8-.7 1.4-.9c.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 3.2a6.6 6.6 0 1 0 0 13.2 6.6 6.6 0 0 0 0-13.2Zm0 10.9a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm6.9-11.1a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0Z",
  },
  {
    nome: "LinkedIn",
    href: () => site.linkedin,
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C21.5 8.65 22 11.1 22 14.3V21h-4v-5.9c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V21h-4V9Z",
  },
  {
    nome: "WhatsApp",
    href: () => `https://wa.me/${site.whatsapp}`,
    path: "M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.9a8 8 0 1 1-4.1 14.85l-.3-.17-3.08.88.9-3-.2-.31A8 8 0 0 1 12.05 3.9Zm4.6 10.1c-.25-.13-1.47-.73-1.7-.81-.23-.09-.4-.13-.56.12s-.64.8-.79.97c-.14.17-.29.19-.54.06a6.6 6.6 0 0 1-1.93-1.19 7.2 7.2 0 0 1-1.34-1.66c-.14-.24 0-.37.11-.5l.37-.43c.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43h-.47a.9.9 0 0 0-.66.31c-.22.25-.86.85-.86 2.06s.89 2.4 1.01 2.56c.13.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.4.52.6.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.17-.47-.3Z",
  },
];

export function Footer() {
  const ano = new Date().getFullYear();
  const visiveis = redes.filter((r) => preenchido(r.href()));

  return (
    <footer className="border-t border-line">
      {/* bloco centralizado */}
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-7 px-4 py-20 text-center sm:px-6 md:py-28">
        <Link href="/" aria-label="fracttini.labs — início" className="inline-flex min-h-11 items-center">
          <Logo />
        </Link>

        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {navegacao.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="sublinha inline-flex min-h-11 items-center justify-center px-2 text-muted transition-colors hover:text-ink">
                  {n.rotulo}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contato/" className="sublinha inline-flex min-h-11 items-center justify-center px-2 text-muted transition-colors hover:text-ink">
                Nos conta o problema
              </Link>
            </li>
          </ul>
        </nav>

        {visiveis.length > 0 && (
          <ul className="flex items-center gap-2">
            {visiveis.map((r) => (
              <li key={r.nome}>
                <a
                  href={r.href()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.nome}
                  className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-white/[0.07] hover:text-ink"
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                    <path d={r.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="text-sm text-muted">
          © {ano} {site.nome}. Todos os direitos reservados.
        </p>
      </div>

      {/* linha divisória + barra inferior */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-px bg-line" />
        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="aperta inline-flex min-h-11 items-center gap-2 rounded-full bg-surface px-4 text-sm text-ink ring-1 ring-inset ring-line transition-colors hover:ring-[var(--color-line-forte)]"
          >
            <svg viewBox="0 0 24 24" className="size-4 text-ok" fill="currentColor" aria-hidden>
              <path d={redes[2].path} />
            </svg>
            Chamar no WhatsApp
          </a>
          <p className="text-sm text-muted">Equipe toda em {site.cidade}</p>
        </div>
      </div>
    </footer>
  );
}
