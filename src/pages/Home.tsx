import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { addCircleOutline, barChartOutline, cashOutline, listOutline, walletOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';

import { Simulacao } from '../types';
import { database } from '../services/database';
import { formatCurrency } from '../utils/calculos';

const Home: React.FC = () => {
  const router = useIonRouter();
  const [simulacoes, setSimulacoes] = useState<Simulacao[]>([]);

  useEffect(() => {
    database.listarSimulacoes().then(setSimulacoes).catch(() => {});
  }, []);

  const totalTributos = simulacoes.reduce((acc, s) => acc + s.das + s.inss + s.irrf, 0);
  const totalLiquido = simulacoes.reduce((acc, s) => acc + s.totalLiquido, 0);
  const ultimaSimulacao = simulacoes.length > 0 ? simulacoes[0] : null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#f5edf7' } as any}>
          <IonTitle style={{ color: '#6b4a8c', fontWeight: 'bold' }}>
            💰 PJLA Resumo Financeiro
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#faf5ff' } as any}>
        <IonGrid style={{ padding: '16px' }}>
          <IonRow>
            <IonCol size="12">
              <IonCard style={{
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #e8ddf2, #d8c8e8)',
                boxShadow: '0 4px 12px rgba(156, 123, 184, 0.2)',
              }}>
                <IonCardContent style={{ textAlign: 'center' }}>
                  <h2 style={{ color: '#4a2a5a', marginBottom: '8px' }}>
                    📊 Resumo Financeiro
                  </h2>
                  <p style={{ color: '#6a4a7a', marginBottom: '16px' }}>
                    Simples Nacional - Anexo III
                  </p>
                  <IonText style={{ display: 'block', color: '#7a5a9c' }}>
                    Ferramenta de cálculo para médicas PJ
                  </IonText>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          {ultimaSimulacao && (
            <IonRow>
              <IonCol size="6">
                <div style={{ background: '#f3edf7', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                  <IonIcon icon={barChartOutline} style={{ color: '#9c7bb8', fontSize: '22px' }} />
                  <IonText style={{ display: 'block', fontSize: '0.75rem', color: '#7a5a9c', marginTop: '4px' }}>
                    Simulações
                  </IonText>
                  <IonText style={{ display: 'block', fontSize: '1.2rem', fontWeight: 'bold', color: '#6b4a8c' }}>
                    {simulacoes.length}
                  </IonText>
                </div>
              </IonCol>
              <IonCol size="6">
                <div style={{ background: '#fde8e8', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                  <IonIcon icon={cashOutline} style={{ color: '#e8a0a0', fontSize: '22px' }} />
                  <IonText style={{ display: 'block', fontSize: '0.75rem', color: '#c97a7a', marginTop: '4px' }}>
                    Total Tributos
                  </IonText>
                  <IonText style={{ display: 'block', fontSize: '1.2rem', fontWeight: 'bold', color: '#b86a6a' }}>
                    {formatCurrency(totalTributos)}
                  </IonText>
                </div>
              </IonCol>
              <IonCol size="12" style={{ marginTop: '8px' }}>
                <div style={{ background: '#e8f0e8', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                  <IonIcon icon={walletOutline} style={{ color: '#80a080', fontSize: '22px' }} />
                  <IonText style={{ display: 'block', fontSize: '0.75rem', color: '#608060', marginTop: '4px' }}>
                    Total Líquido Acumulado
                  </IonText>
                  <IonText style={{ display: 'block', fontSize: '1.2rem', fontWeight: 'bold', color: '#4a804a' }}>
                    {formatCurrency(totalLiquido)}
                  </IonText>
                </div>
              </IonCol>
            </IonRow>
          )}

          <IonRow>
            <IonCol size="12" style={{ marginTop: '16px' }}>
              <IonButton
                expand="block"
                style={{
                  '--background': '#b8a0d4',
                  '--background-hover': '#a889c8',
                  '--border-radius': '14px',
                  '--color': '#fff',
                  height: '64px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                } as any}
                onClick={() => router.push('/nova-simulacao')}
              >
                <IonIcon slot="start" icon={addCircleOutline} />
                Nova Simulação
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12" style={{ marginTop: '12px' }}>
              <IonButton
                expand="block"
                fill="outline"
                style={{
                  '--border-color': '#b8a0d4',
                  '--color': '#7a5a9c',
                  '--border-radius': '14px',
                  height: '64px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                } as any}
                onClick={() => router.push('/historico')}
              >
                <IonIcon slot="start" icon={listOutline} />
                Ver Histórico
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
