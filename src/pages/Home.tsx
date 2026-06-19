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
import { addCircleOutline, listOutline } from 'ionicons/icons';

import React from 'react';

const Home: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#f5edf7' } as any}>
          <IonTitle style={{ color: '#6b4a8c', fontWeight: 'bold' }}>
            💰 Médica PJ
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
