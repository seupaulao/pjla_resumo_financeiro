import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  useIonToast,
} from '@ionic/react';
import { documentTextOutline, downloadOutline, shareOutline } from 'ionicons/icons';
import { formatCurrency, formatDate } from '../utils/calculos';

import React from 'react';
import { Share } from '@capacitor/share';
import { Simulacao } from '../types';

interface ExportarButtonsProps {
  simulacao: Simulacao;
}

const ExportarButtons: React.FC<ExportarButtonsProps> = ({ simulacao }) => {
  const [present] = useIonToast();

  const gerarMarkdown = (): string => {
    const { data, receita, rbt12, percentualProLabore, das, inss, irrf, 
            prolaboreBruto, prolaboreLiquido, lucroDistribuivel, totalLiquido, descricao } = simulacao;

    return `# 📊 Resumo Financeiro - Médica PJ

**Data:** ${formatDate(data)}
${descricao ? `**Descrição:** ${descricao}\n` : ''}

## 📌 Dados de Entrada

| Descrição | Valor |
|-----------|-------|
| Receita Bruta | ${formatCurrency(receita)} |
| RBT12 | ${formatCurrency(rbt12)} |
| % Pró-labore | ${(percentualProLabore * 100).toFixed(0)}% |

## 🧾 Tributos

| Descrição | Valor |
|-----------|-------|
| DAS (Simples Nacional) | ${formatCurrency(das)} |
| INSS (11%) | ${formatCurrency(inss)} |
| IRRF | ${formatCurrency(irrf)} |

## 💰 Pró-labore

| Descrição | Valor |
|-----------|-------|
| Valor Bruto | ${formatCurrency(prolaboreBruto)} |
| (-) INSS | ${formatCurrency(inss)} |
| (-) IRRF | ${formatCurrency(irrf)} |
| **✅ Líquido** | **${formatCurrency(prolaboreLiquido)}** |

## 📦 Lucro Distribuível (ISENTO)

**${formatCurrency(lucroDistribuivel)}**

## 💵 TOTAL LÍQUIDO NO BOLSO

**${formatCurrency(totalLiquido)}**

## 📅 Obrigações de Recolhimento (até dia 20)

- DAS: ${formatCurrency(das)} (código 1007)
- GPS: ${formatCurrency(inss)} (código 1007)
- DARF: ${formatCurrency(irrf)} (código 0561)

---
*Gerado automaticamente pelo App Resumo Financeiro Médica PJ*
`;
  };

  const gerarCSV = (): string => {
    const { data, receita, rbt12, percentualProLabore, das, inss, irrf, 
            prolaboreBruto, prolaboreLiquido, lucroDistribuivel, totalLiquido } = simulacao;

    return `Data;Receita;RBT12;% Pró-labore;DAS;INSS;IRRF;Pró-labore Bruto;Pró-labore Líquido;Lucro Distribuível;Total Líquido
${formatDate(data)};${receita.toFixed(2)};${rbt12.toFixed(2)};${(percentualProLabore * 100).toFixed(0)}%;${das.toFixed(2)};${inss.toFixed(2)};${irrf.toFixed(2)};${prolaboreBruto.toFixed(2)};${prolaboreLiquido.toFixed(2)};${lucroDistribuivel.toFixed(2)};${totalLiquido.toFixed(2)}`;
  };

  const exportarArquivo = async (conteudo: string, tipo: 'md' | 'csv') => {
    try {
      const filename = `resumo_${Date.now()}.${tipo}`;
      const mimeType = tipo === 'md' ? 'text/markdown' : 'text/csv';
      
      await Filesystem.writeFile({
        path: filename,
        data: conteudo,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      present({
        message: `Arquivo ${filename} salvo com sucesso!`,
        duration: 3000,
        color: 'success',
        position: 'bottom',
      });
    } catch (error) {
      present({
        message: 'Erro ao exportar arquivo',
        duration: 3000,
        color: 'danger',
        position: 'bottom',
      });
    }
  };

  const compartilhar = async (conteudo: string, tipo: 'md' | 'csv') => {
    try {
      await Share.share({
        title: `Resumo Financeiro - ${formatDate(simulacao.data)}`,
        text: conteudo,
        dialogTitle: 'Compartilhar resumo',
      });
    } catch (error) {
      present({
        message: 'Erro ao compartilhar',
        duration: 3000,
        color: 'danger',
        position: 'bottom',
      });
    }
  };

  return (
    <IonGrid style={{ padding: 0 }}>
      <IonRow>
        <IonCol size="6">
          <IonButton
            expand="block"
            fill="outline"
            style={{ 
              '--border-color': '#b8a0d4',
              '--color': '#7a5a9c',
              '--border-radius': '12px',
            } as any}
            onClick={() => exportarArquivo(gerarMarkdown(), 'md')}
          >
            <IonIcon slot="start" icon={documentTextOutline} />
            Markdown
          </IonButton>
        </IonCol>
        <IonCol size="6">
          <IonButton
            expand="block"
            fill="outline"
            style={{ 
              '--border-color': '#b8a0d4',
              '--color': '#7a5a9c',
              '--border-radius': '12px',
            } as any}
            onClick={() => exportarArquivo(gerarCSV(), 'csv')}
          >
            <IonIcon slot="start" icon={downloadOutline} />
            CSV
          </IonButton>
        </IonCol>
        <IonCol size="12" style={{ marginTop: '8px' }}>
          <IonButton
            expand="block"
            style={{
              '--background': '#b8a0d4',
              '--background-hover': '#a889c8',
              '--border-radius': '12px',
              '--color': '#fff',
            } as any}
            onClick={() => compartilhar(gerarMarkdown(), 'md')}
          >
            <IonIcon slot="start" icon={shareOutline} />
            Compartilhar
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ExportarButtons;
