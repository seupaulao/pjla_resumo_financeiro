import {
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemSliding,
  IonLabel,
  IonRow,
  IonText,
  useIonToast,
} from '@ionic/react';
import { cashOutline, calendarOutline, trashOutline } from 'ionicons/icons';
import { formatCurrency, formatDate } from '../utils/calculos';

import React from 'react';
import { Simulacao } from '../types';
import { database } from '../services/database';
import { useIonRouter } from '@ionic/react';

interface HistoricoListProps {
  simulacoes: Simulacao[];
  onDelete: (id: number) => void;
}

const HistoricoList: React.FC<HistoricoListProps> = ({ simulacoes, onDelete }) => {
  const router = useIonRouter();
  const [present] = useIonToast();

  const handleDelete = async (id: number) => {
    try {
      await database.deleteSimulacao(id);
      onDelete(id);
      present({
        message: 'Simulação excluída',
        duration: 2000,
        color: 'success',
        position: 'bottom',
      });
    } catch {
      present({
        message: 'Erro ao excluir',
        duration: 3000,
        color: 'danger',
        position: 'bottom',
      });
    }
  };

  return (
    <IonGrid style={{ padding: 0 }}>
      {simulacoes.map((sim) => (
        <IonRow key={sim.id}>
          <IonCol size="12">
            <IonCard
              style={{ borderRadius: '14px', margin: '0 0 12px 0', cursor: 'pointer' }}
              onClick={() => router.push(`/detalhes/${sim.id}`)}
            >
              <IonCardContent style={{ padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <IonIcon icon={calendarOutline} style={{ color: '#b8a0d4', fontSize: '16px' }} />
                      <IonText style={{ fontSize: '0.85rem', color: '#7a5a9c' }}>
                        {formatDate(sim.data)}
                      </IonText>
                    </div>
                    {sim.descricao && (
                      <IonChip style={{ background: '#e8ddf2', color: '#7a5a9c', height: '22px', fontSize: '0.75rem', margin: '0 0 6px 0' }}>
                        {sim.descricao}
                      </IonChip>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IonIcon icon={cashOutline} style={{ color: '#9c7bb8', fontSize: '16px' }} />
                      <IonText style={{ fontSize: '1rem', fontWeight: 'bold', color: '#6b4a8c' }}>
                        {formatCurrency(sim.receita)}
                      </IonText>
                    </div>
                  </div>
                  <IonButton
                    fill="clear"
                    style={{ '--color': '#d4a8a8', margin: 0 } as any}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(sim.id!);
                    }}
                  >
                    <IonIcon slot="icon-only" icon={trashOutline} />
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default HistoricoList;
