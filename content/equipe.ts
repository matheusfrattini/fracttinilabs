/**
 * QUEM SOMOS — sem adjetivo genérico. Cada pessoa aparece com o que
 * faz de verdade e uma prova concreta (algo que construiu/entregou).
 * Foto: /public/equipe/<arquivo>. Sem foto, aparece a inicial.
 */
export type Pessoa = {
  nome: string;
  papel: string;
  oQueFaz: string;
  foto?: string;
  publicar: boolean;
};

export const equipe: Pessoa[] = [
  { nome: "Matheus Frattini", papel: "Produto, desenvolvimento e comercial", oQueFaz: "PREENCHER", publicar: false },
  { nome: "João Vitor (JV)", papel: "Automações", oQueFaz: "PREENCHER", publicar: false },
  { nome: "Gabriel Rosa", papel: "Relacionamento com clientes e administrativo", oQueFaz: "PREENCHER", publicar: false },
  { nome: "Vitão", papel: "Marketing", oQueFaz: "PREENCHER", publicar: false },
];
