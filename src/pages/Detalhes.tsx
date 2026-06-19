import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import React from 'react';
import { useIonRouter } from '@ionic/react';

const Detalhes: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#f5edf7' } as any}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle style={{ color: '#6b4a8c', fontWeight: 'bold' }}>
            Detalhes
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#faf5ff' } as any}>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <IonText style={{ color: '#b8a0d4', fontSize: '64px', display: 'block' }}>
            ℹ️
          </IonText>
          <h2 style={{ color: '#6b4a8c', marginTop: '24px' }}>
            Página não Disponível
          </h2>
          <IonText style={{ display: 'block', color: '#7a5a9c', marginTop: '16px', lineHeight: '1.6' }}>
            A visualização de detalhes está desabilitada pois a aplicação funciona sem banco de dados.
            <br />
            Os resultados das simulações são exibidos diretamente na tela de cálculo.
          </IonText>
          <IonButton
            style={{ marginTop: '32px', '--background': '#b8a0d4' } as any}
            expand="block"
            onClick={() => router.push('/nova-simulacao')}
          >
            Criar Nova Simulação
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Detalhes;
