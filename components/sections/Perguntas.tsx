import { perguntas } from "@/content/textos";

export function Perguntas() {
  return (
    <div>
      <h2 className="mb-8 text-2xl sm:text-3xl">Perguntas comuns</h2>
      <ul className="border-t border-line">
        {perguntas.map((q) => (
          <li key={q.p} className="border-b border-line">
            <details className="group py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[17px] [&::-webkit-details-marker]:hidden">
                {q.p}
                <span className="mt-0.5 text-muted transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none" aria-hidden>+</span>
              </summary>
              <p className="texto-leitura mt-3 leading-relaxed text-muted">{q.r}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
