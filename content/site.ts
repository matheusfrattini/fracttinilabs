/**
 * Dados gerais da empresa. Tudo que estiver "PREENCHER" precisa ser
 * trocado antes de publicar.
 */
export const site = {
  nome: "fracttini.labs",
  cidade: "Campinas e região",
  // Só números, com DDI e DDD. Ex.: "5519999999999"
  whatsapp: "5519998501017",
  email: "PREENCHER",
  instagram: "PREENCHER", // ex.: "https://instagram.com/fracttini.labs"
  linkedin: "PREENCHER",  // opcional — se ficar PREENCHER, não aparece no rodapé
  url: "https://PREENCHER.com.br",
  descricao:
    "Sistemas de gestão, automações com IA e sites para pequenos negócios de Campinas e região.",
};

/**
 * Menu. Uma entrada por tipo de projeto + a vitrine geral.
 * NÃO existe item "Contato": a página do formulário é
 * "Nos conta o problema" e vive no botão principal.
 */
export const navegacao = [
  { href: "/dashboards/", rotulo: "Dashboards" },
  { href: "/automacoes/", rotulo: "Automações" },
  { href: "/web-design/", rotulo: "Web design" },
  { href: "/aplicativos/", rotulo: "Aplicativos" },
  { href: "/projetos/", rotulo: "Projetos" },
];

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/** Um link só aparece quando o dado foi preenchido de verdade. */
export function preenchido(valor: string) {
  return Boolean(valor) && valor !== "PREENCHER" && !valor.includes("PREENCHER");
}
