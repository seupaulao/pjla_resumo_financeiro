import { DadosEntrada, Simulacao } from '../types';
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
import React, { useState } from 'react';

import ExportarButtons from '../components/ExportarButtons';
import FinanceiroForm from '../components/FinanceiroForm';
import ResumoCard from '../components/ResumoCard';
import { calcularSimulacao } from '../utils/calculos';

const NovaSimulacao: React.FC = () => {
  const [simulacao, setSimulacao] = useState<Simulacao | null>(null);

  const handleSubmit = (dados: DadosEntrada) => {
    const resultado = calcularSimulacao(
      dados.receita,
      dados.rbt12,
      dados.percentualProLabore
    );

    const novaSimulacao: Simulacao = {
      id: Math.random(),
      data: new Date().toISOString(),
      receita: dados.receita,
      rbt12: dados.rbt12,
      percentualProLabore: dados.percentualProLabore,
      descricao: dados.descricao,
      ...resultado,
    };

    setSimulacao(novaSimulacao);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#f5edf7' } as any}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle style={{ color: '#6b4a8c', fontWeight: 'bold' }}>
            Nova Simulação
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#faf5ff' } as any}>
        <div style={{ padding: '16px' }}>
          {!simulacao ? (
            <FinanceiroForm onSubmit={handleSubmit} loading={false} />
          ) : (
            <>
              <ResumoCard simulacao={simulacao} />
              <div style={{ marginTop: '16px' }}>
                <ExportarButtons simulacao={simulacao} />
              </div>
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <IonButton
                  fill="clear"
                  style={{ '--color': '#b8a0d4' } as any}
                  onClick={() => setSimulacao(null)}
                >
                  Nova Simulação
                </IonButton>
              </div>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NovaSimulacao;
