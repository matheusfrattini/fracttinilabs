import Link from "next/link";

/**
 * Motion #04 do PDF: botão com seta num círculo que cresce e
 * acende no hover, e a seta sobe na diagonal.
 */
export function BotaoSeta({
  href,
  children,
  ativo = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  /** Deixa o botão já no estado "aceso" (card que começa aberto). */
  ativo?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`aperta group/seta inline-flex min-h-12 items-center gap-3 rounded-full border border-line pr-1.5 pl-5 text-sm text-ink transition-colors hover:border-[var(--color-line-forte)] ${className}`}
    >
      {children}
      <span
        className={`grid size-9 place-items-center rounded-full transition-[transform,background-color,color] duration-300 group-hover/seta:scale-110 group-hover/seta:bg-ink group-hover/seta:text-paper motion-reduce:transition-none motion-reduce:group-hover/seta:scale-100 ${
          ativo ? "bg-ink text-paper" : "bg-white/[0.06] text-ink"
        }`}
        aria-hidden
      >
        <svg viewBox="0 0 16 16" className="size-4 transition-transform duration-300 group-hover/seta:-translate-y-px group-hover/seta:translate-x-px motion-reduce:transition-none" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12 12 4M6 4h6v6" />
        </svg>
      </span>
    </Link>
  );
}
