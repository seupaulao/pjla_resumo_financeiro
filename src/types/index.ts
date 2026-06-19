export interface Simulacao {
  id?: number;
  data: string;
  receita: number;
  rbt12: number;
  percentualProLabore: number;
  das: number;
  inss: number;
  irrf: number;
  prolaboreBruto: number;
  prolaboreLiquido: number;
  lucroDistribuivel: number;
  totalLiquido: number;
  descricao?: string;
}

export interface DadosEntrada {
  receita: number;
  rbt12: number;
  percentualProLabore: number;
  descricao?: string;
}

export const TABELA_IRRF = [
  { ate: 2824.00, aliquota: 0, deducao: 0 },
  { ate: 3751.05, aliquota: 0.075, deducao: 211.80 },
  { ate: 4664.68, aliquota: 0.15, deducao: 533.21 },
  { ate: 8692.00, aliquota: 0.225, deducao: 882.99 },
];

export const INSS_ALIQUOTA = 0.11;
export const TETO_INSS = 7507.49;
