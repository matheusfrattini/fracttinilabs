# fracttini.labs — site

## Rodar no seu computador
```bash
npm install
npm run dev        # abre em http://localhost:3000
```

## Publicar
```bash
npm run build      # gera a pasta out/
```
Suba o conteúdo de `out/` para a hospedagem (Hostinger: Gerenciador de Arquivos → public_html).

## Estrutura
```
app/                páginas: / (início), /projetos, /contato
components/
  layout/           Header (menu mobile), Footer, Logo
  ui/               Botao, Selo, Secao, TelaProjeto
  motion/           Reveal, ProvedorMotion
  sections/         Hero, DemoFluxo, Frentes, Destaques, Processo, Equipe,
                    Depoimentos, ChamadaFinal, ListaProjetos, FormContato, Perguntas
content/            TODO o conteúdo editável
lib/publicar.ts     regra rascunho (dev) x publicado (build)
public/             imagens
```

## Checklist antes de ir ao ar
- [ ] content/site.ts: whatsapp, email, instagram, url
- [ ] content/projetos.ts: projetos reais + telas + `publicar: true`
- [ ] content/equipe.ts: o que cada um faz + fotos + `publicar: true`
- [ ] content/textos.ts: revisar textos com a equipe
- [ ] app/globals.css: cores da logo final
- [ ] components/layout/Logo.tsx: logo final
- [ ] Buscar "PREENCHER" no projeto: não pode sobrar nada publicado
