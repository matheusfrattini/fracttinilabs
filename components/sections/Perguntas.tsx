import { perguntas } from "@/content/textos";

export function Perguntas() {
  return (
    <div>
      <h2 className="mb-6 text-2xl sm:text-3xl">Perguntas comuns</h2>
      <ul className="border-t border-line">
        {perguntas.map((q) => (
          <li key={q.p} className="border-b border-line">
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {q.p}
                <span className="mt-1 text-brand transition-transform duration-300 group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-muted">{q.r}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
