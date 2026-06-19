import { INSS_ALIQUOTA, TABELA_IRRF, TETO_INSS } from '../types';

export function calcularIRRF(base: number): number {
  for (const faixa of TABELA_IRRF) {
    if (base <= faixa.ate) {
      return Math.max(0, (base * faixa.aliquota) - faixa.deducao);
    }
  }
  return Math.max(0, (base * 0.275) - 1516.10);
}

export function calcularDAS(receita: number, rbt12: number): number {
  if (rbt12 <= 180000) return receita * 0.06;
  if (rbt12 <= 360000) return (receita * 0.112) - (9360 * receita / rbt12);
  if (rbt12 <= 720000) return (receita * 0.135) - (17640 * receita / rbt12);
  if (rbt12 <= 1800000) return (receita * 0.16) - (35640 * receita / rbt12);
  if (rbt12 <= 3600000) return (receita * 0.21) - (125640 * receita / rbt12);
  return (receita * 0.33) - (648000 * receita / rbt12);
}

export function calcularSimulacao(receita: number, rbt12: number, percentualProLabore: number) {
  const das = Math.round(calcularDAS(receita, rbt12) * 100) / 100;
  const prolaboreBruto = Math.round(receita * percentualProLabore * 100) / 100;
  const inss = Math.round(Math.min(prolaboreBruto, TETO_INSS) * INSS_ALIQUOTA * 100) / 100;
  const irrf = Math.round(calcularIRRF(prolaboreBruto) * 100) / 100;
  const prolaboreLiquido = Math.round((prolaboreBruto - inss - irrf) * 100) / 100;
  const lucroDistribuivel = Math.round((receita - prolaboreBruto) * 100) / 100;
  const totalLiquido = Math.round((receita - das - inss - irrf) * 100) / 100;

  return {
    das,
    inss,
    irrf,
    prolaboreBruto,
    prolaboreLiquido,
    lucroDistribuivel,
    totalLiquido
  };
}

export function formatCurrency(value: number): string {
  return `R$ ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString('pt-BR');
}
