import {
  IonBackButton,
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

import ExportarButtons from '../components/ExportarButtons';
import ResumoCard from '../components/ResumoCard';
import { Simulacao } from '../types';
import { database } from '../services/database';
import { useParams } from 'react-router-dom';

const Detalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [simulacao, setSimulacao] = useState<Simulacao | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await database.getSimulacao(Number(id));
        if (data) {
          setSimulacao(data);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': '#f5edf7' } as any}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/historico" />
          </IonButtons>
          <IonTitle style={{ color: '#6b4a8c', fontWeight: 'bold' }}>
            Detalhes
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#faf5ff' } as any}>
        <div style={{ padding: '16px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <IonSpinner style={{ color: '#b8a0d4' }} />
            </div>
          ) : error || !simulacao ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <IonText style={{ color: '#b8a0d4', fontSize: '64px', display: 'block' }}>
                🔍
              </IonText>
              <h2 style={{ color: '#6b4a8c', marginTop: '24px' }}>
                Simulação não Encontrada
              </h2>
              <IonText style={{ display: 'block', color: '#7a5a9c', marginTop: '16px', lineHeight: '1.6' }}>
                A simulação que você está procurando não existe ou foi removida.
              </IonText>
            </div>
          ) : (
            <>
              <ResumoCard simulacao={simulacao} />
              <div style={{ marginTop: '16px' }}>
                <ExportarButtons simulacao={simulacao} />
              </div>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Detalhes;
