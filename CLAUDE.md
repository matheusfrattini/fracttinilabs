# fracttini-site — regras do projeto

Site/portfólio da fracttini.labs. Next.js 15 (App Router) + TypeScript + Tailwind v4 + Motion.
Exportado como site ESTÁTICO (`output: "export"`): `npm run build` gera `out/`.

## Regras que não podem ser quebradas
- NUNCA inventar conteúdo: nome de cliente, dor, resultado, número, depoimento ou bio.
  Texto que falta fica como "PREENCHER" e é avisado no resumo.
- Todo item em /content tem `publicar`. Em `npm run dev` tudo aparece com selo
  "Rascunho"; no build só sai o que tem `publicar: true`. Não mudar essa regra.
- Sem preço em lugar nenhum do site.
- Cores só via tokens em app/globals.css (@theme). Não usar hex solto em componente novo.
  Laranja (accent) com uso mínimo.
- Mobile primeiro: testar em 390px de largura, sem rolagem horizontal, alvos de toque >= 44px.
- Animação: um momento principal (DemoFluxo no hero) + animações que respondem a ação
  (filtros, abrir caso, menu, formulário). Não espalhar fade em todo elemento.
- Sem servidor: formulário abre o WhatsApp com a mensagem pronta (content/site.ts).

## Onde mexer
- Textos e dados: /content (site.ts, projetos.ts, equipe.ts, depoimentos.ts, textos.ts)
- Imagens: /public/projetos/<slug>/ e /public/equipe/
- Cores e fontes: app/globals.css
- Logo: components/layout/Logo.tsx

## Comandos
npm run dev | npm run build | npm run lint | npm run typecheck | npm start (serve a pasta out/)
