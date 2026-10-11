/**
 * Dados gerais da empresa. Tudo que estiver "PREENCHER" precisa ser
 * trocado antes de publicar.
 */
export const site = {
  nome: "fracttini.labs",
  cidade: "Campinas e região",
  // Só números, com DDI e DDD. Ex.: "5519999999999"
  whatsapp: "PREENCHER",
  email: "PREENCHER",
  instagram: "PREENCHER", // ex.: "https://instagram.com/fracttini.labs"
  url: "https://PREENCHER.com.br",
  descricao:
    "Sistemas de gestão, automações com IA e sites para pequenos negócios de Campinas e região.",
};

export const navegacao = [
  { href: "/", rotulo: "Início" },
  { href: "/projetos/", rotulo: "Projetos" },
  { href: "/contato/", rotulo: "Contato" },
];

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
