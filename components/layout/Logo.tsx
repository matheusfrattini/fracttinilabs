/**
 * Logo provisória em texto. Quando a logo final estiver pronta,
 * salve em /public/logo.svg e troque o conteúdo por:
 *   <img src="/logo.svg" alt="fracttini.labs" className="h-7 w-auto" />
 */
export function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <span className={`font-display text-xl font-medium tracking-[-0.03em] ${claro ? "text-white" : "text-ink"}`}>
      fracttini<span className={claro ? "text-white/60" : "text-brand"}>.labs</span>
    </span>
  );
}
