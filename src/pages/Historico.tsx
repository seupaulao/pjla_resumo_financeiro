import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';

import HistoricoList from '../components/HistoricoList';
import { Simulacao } from '../types';
import { database } from '../services/database';
import { useIonRouter } from '@ionic/react';

const Historico: React.FC = () => {
  const router = useIonRouter();
  const [simulacoes, setSimulacoes] = useState<Simulacao[]>([]);
  const [loading, setLoading] = useState(true);

  const carregar = async () => {
    setLoading(true);
    try {
      const lista = await database.listarSimulacoes();
      setSimulacoes(lista);
    } catch {
      setSimulacoes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleDelete = (id: number) => {
    setSimulacoes((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#f5edf7' } as any}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle style={{ color: '#6b4a8c', fontWeight: 'bold' }}>
            Histórico
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#faf5ff' } as any}>
        <div style={{ padding: '16px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <IonSpinner style={{ color: '#b8a0d4' }} />
            </div>
          ) : simulacoes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <IonText style={{ color: '#b8a0d4', fontSize: '64px', display: 'block' }}>
                📋
              </IonText>
              <h2 style={{ color: '#6b4a8c', marginTop: '24px' }}>
                Nenhuma Simulação
              </h2>
              <IonText style={{ display: 'block', color: '#7a5a9c', marginTop: '16px', lineHeight: '1.6' }}>
                Você ainda não realizou nenhuma simulação.
                <br />
                Crie uma nova para começar!
              </IonText>
              <IonButton
                style={{ marginTop: '32px', '--background': '#b8a0d4' } as any}
                expand="block"
                onClick={() => router.push('/nova-simulacao')}
              >
                Criar Nova Simulação
              </IonButton>
            </div>
          ) : (
            <>
              <IonText style={{ display: 'block', color: '#7a5a9c', marginBottom: '16px', fontSize: '0.9rem' }}>
                {simulacoes.length} simulação(ões) encontrada(s)
              </IonText>
              <HistoricoList simulacoes={simulacoes} onDelete={handleDelete} />
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Historico;
