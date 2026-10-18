import Script from "next/script";

/**
 * Google Analytics 4 — DESLIGADO por padrão.
 *
 * Só carrega se existir a variável de ambiente NEXT_PUBLIC_GA_ID.
 * Sem ela, este componente devolve null: nenhum script, nenhum cookie,
 * nenhuma requisição para o Google.
 *
 * Para ativar, crie um arquivo .env.local na raiz do projeto com:
 *   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 * e rode o build de novo.
 *
 * ATENÇÃO: o site é exportado estático (output: "export"), então o ID é
 * embutido no HTML no momento do `npm run build`. Trocar a variável
 * depois do build não tem efeito — é preciso buildar outra vez.
 */
const ID = process.env.NEXT_PUBLIC_GA_ID;

export function GA4() {
  if (!ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ID}');`}
      </Script>
    </>
  );
}
