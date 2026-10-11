import Link from "next/link";
import { navegacao, site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  const ano = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-muted">{site.descricao}</p>
        </div>
        <nav aria-label="Rodapé">
          <h2 className="mb-3 font-sans text-sm font-semibold tracking-normal text-ink">Páginas</h2>
          <ul className="space-y-2 text-muted">
            {navegacao.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-ink">{n.rotulo}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 font-sans text-sm font-semibold tracking-normal text-ink">Contato</h2>
          <ul className="space-y-2 text-muted">
            <li><a className="hover:text-ink" href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a></li>
            <li><a className="hover:text-ink" href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a className="hover:text-ink" href={site.instagram}>Instagram</a></li>
            <li>{site.cidade}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8 text-sm text-muted sm:px-6">
        © {ano} {site.nome}
      </div>
    </footer>
  );
}
