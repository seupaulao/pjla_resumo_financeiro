import {
  IonCard,
  IonCardContent,
  IonChip,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from '@ionic/react';
import {
  cashOutline,
  documentTextOutline,
  pieChartOutline,
  trendingDownOutline,
  walletOutline,
} from 'ionicons/icons';
import { formatCurrency, formatDate } from '../utils/calculos';

import React from 'react';
import { Simulacao } from '../types';

interface ResumoCardProps {
  simulacao: Simulacao;
}

const ResumoCard: React.FC<ResumoCardProps> = ({ simulacao }) => {
  const {
    data,
    receita,
    das,
    inss,
    irrf,
    prolaboreBruto,
    prolaboreLiquido,
    lucroDistribuivel,
    totalLiquido,
    descricao,
  } = simulacao;

  const tributosTotal = das + inss + irrf;

  return (
    <IonCard style={{ borderRadius: '16px', background: '#faf5ff', boxShadow: '0 4px 12px rgba(156, 123, 184, 0.15)' }}>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <IonText color="medium" style={{ fontSize: '0.9rem' }}>
                  {formatDate(data)}
                </IonText>
                {descricao && (
                  <IonChip style={{ background: '#e8ddf2', color: '#7a5a9c' }}>
                    {descricao}
                  </IonChip>
                )}
              </div>
              <IonIcon icon={documentTextOutline} style={{ color: '#b8a0d4', fontSize: '24px' }} />
            </IonCol>
          </IonRow>

          <IonRow style={{ marginTop: '8px' }}>
            <IonCol size="6">
              <div style={{ background: '#f3edf7', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <IonIcon icon={cashOutline} style={{ color: '#9c7bb8', fontSize: '20px' }} />
                <IonText style={{ display: 'block', fontSize: '0.8rem', color: '#7a5a9c', marginTop: '4px' }}>
                  Receita
                </IonText>
                <IonText style={{ display: 'block', fontSize: '1.1rem', fontWeight: 'bold', color: '#6b4a8c' }}>
                  {formatCurrency(receita)}
                </IonText>
              </div>
            </IonCol>

            <IonCol size="6">
              <div style={{ background: '#fde8e8', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <IonIcon icon={trendingDownOutline} style={{ color: '#e8a0a0', fontSize: '20px' }} />
                <IonText style={{ display: 'block', fontSize: '0.8rem', color: '#c97a7a', marginTop: '4px' }}>
                  Tributos
                </IonText>
                <IonText style={{ display: 'block', fontSize: '1.1rem', fontWeight: 'bold', color: '#b86a6a' }}>
                  {formatCurrency(tributosTotal)}
                </IonText>
              </div>
            </IonCol>
          </IonRow>

          <IonRow style={{ marginTop: '12px' }}>
            <IonCol size="4">
              <div style={{ background: '#f5edf0', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                <IonText style={{ display: 'block', fontSize: '0.7rem', color: '#a08090' }}>
                  DAS
                </IonText>
                <IonText style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#8a6a7a' }}>
                  {formatCurrency(das)}
                </IonText>
              </div>
            </IonCol>
            <IonCol size="4">
              <div style={{ background: '#f5edf0', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                <IonText style={{ display: 'block', fontSize: '0.7rem', color: '#a08090' }}>
                  INSS
                </IonText>
                <IonText style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#8a6a7a' }}>
                  {formatCurrency(inss)}
                </IonText>
              </div>
            </IonCol>
            <IonCol size="4">
              <div style={{ background: '#f5edf0', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                <IonText style={{ display: 'block', fontSize: '0.7rem', color: '#a08090' }}>
                  IRRF
                </IonText>
                <IonText style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold', color: '#8a6a7a' }}>
                  {formatCurrency(irrf)}
                </IonText>
              </div>
            </IonCol>
          </IonRow>

          <IonRow style={{ marginTop: '12px' }}>
            <IonCol size="6">
              <div style={{ background: '#e8f0e8', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <IonIcon icon={walletOutline} style={{ color: '#80a080', fontSize: '20px' }} />
                <IonText style={{ display: 'block', fontSize: '0.8rem', color: '#608060', marginTop: '4px' }}>
                  Pró-labore Líquido
                </IonText>
                <IonText style={{ display: 'block', fontSize: '1.1rem', fontWeight: 'bold', color: '#4a804a' }}>
                  {formatCurrency(prolaboreLiquido)}
                </IonText>
              </div>
            </IonCol>

            <IonCol size="6">
              <div style={{ background: '#e8edf5', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                <IonIcon icon={pieChartOutline} style={{ color: '#8090b0', fontSize: '20px' }} />
                <IonText style={{ display: 'block', fontSize: '0.8rem', color: '#607090', marginTop: '4px' }}>
                  Lucro Distribuível
                </IonText>
                <IonText style={{ display: 'block', fontSize: '1.1rem', fontWeight: 'bold', color: '#4a6080' }}>
                  {formatCurrency(lucroDistribuivel)}
                </IonText>
              </div>
            </IonCol>
          </IonRow>

          <IonRow style={{ marginTop: '12px' }}>
            <IonCol size="12">
              <div style={{ 
                background: 'linear-gradient(135deg, #d8c8e8, #c8b8d8)', 
                borderRadius: '12px', 
                padding: '14px', 
                textAlign: 'center' 
              }}>
                <IonText style={{ display: 'block', fontSize: '0.8rem', color: '#6a4a7a' }}>
                  💵 TOTAL LÍQUIDO NO BOLSO
                </IonText>
                <IonText style={{ display: 'block', fontSize: '1.4rem', fontWeight: 'bold', color: '#4a2a5a' }}>
                  {formatCurrency(totalLiquido)}
                </IonText>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default ResumoCard;
