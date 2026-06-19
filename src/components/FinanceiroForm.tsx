import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from '@ionic/react';
import React, { useState } from 'react';
import { calculatorOutline, saveOutline } from 'ionicons/icons';

import { DadosEntrada } from '../types';

interface FinanceiroFormProps {
  onSubmit: (dados: DadosEntrada) => void;
  loading?: boolean;
}

const FinanceiroForm: React.FC<FinanceiroFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<DadosEntrada>({
    receita: 0,
    rbt12: 0,
    percentualProLabore: 0.28,
    descricao: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!formData.receita || formData.receita <= 0) {
      alert('Receita bruta deve ser maior que 0');
      return;
    }
    if (!formData.rbt12 || formData.rbt12 <= 0) {
      alert('RBT12 deve ser maior que 0');
      return;
    }
    if (formData.percentualProLabore < 0 || formData.percentualProLabore > 1) {
      alert('Pró-labore deve ser entre 0% e 100%');
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonGrid className="ion-padding" style={{ background: '#faf5ff', borderRadius: '16px' }}>
        <IonRow>
          <IonCol size="12">
            <IonItem color="transparent" style={{ '--background': 'transparent' } as any}>
              <IonLabel position="stacked" style={{ color: '#9c7bb8' }}>
                Receita Bruta do Mês *
              </IonLabel>
              <IonInput
                type="number"
                value={formData.receita || ''}
                placeholder="Ex: 20950"
                onIonChange={(e) => setFormData({ ...formData, receita: Number(e.detail.value) })}
                required
                style={{ '--background': '#f3edf7', borderRadius: '8px' } as any}
              />
            </IonItem>
          </IonCol>

          <IonCol size="12">
            <IonItem color="transparent" style={{ '--background': 'transparent' } as any}>
              <IonLabel position="stacked" style={{ color: '#9c7bb8' }}>
                Receita Bruta Últimos 12 Meses (RBT12) *
              </IonLabel>
              <IonInput
                type="number"
                value={formData.rbt12 || ''}
                placeholder="Ex: 180000"
                onIonChange={(e) => setFormData({ ...formData, rbt12: Number(e.detail.value) })}
                required
                style={{ '--background': '#f3edf7', borderRadius: '8px' } as any}
              />
            </IonItem>
          </IonCol>

          <IonCol size="12">
            <IonItem color="transparent" style={{ '--background': 'transparent' } as any}>
              <IonLabel position="stacked" style={{ color: '#9c7bb8' }}>
                % Pró-labore (0 a 100) *
              </IonLabel>
              <IonInput
                type="number"
                value={formData.percentualProLabore * 100 || ''}
                placeholder="28"
                min="0"
                max="100"
                step="0.1"
                onIonChange={(e) => {
                  const valor = Number(e.detail.value) / 100;
                  if (valor >= 0 && valor <= 1) {
                    setFormData({ 
                      ...formData, 
                      percentualProLabore: valor
                    });
                  }
                }}
                style={{ '--background': '#f3edf7', borderRadius: '8px' } as any}
              />
              <IonText slot="helper" style={{ color: '#9c7bb8', fontSize: '0.85rem' }}>
                Digite um valor entre 0 e 100
              </IonText>
            </IonItem>
          </IonCol>

          <IonCol size="12">
            <IonItem color="transparent" style={{ '--background': 'transparent' } as any}>
              <IonLabel position="stacked" style={{ color: '#9c7bb8' }}>
                Descrição (opcional)
              </IonLabel>
              <IonInput
                value={formData.descricao}
                placeholder="Ex: Simulação Janeiro 2026"
                onIonChange={(e) => setFormData({ ...formData, descricao: String(e.detail.value) })}
                style={{ '--background': '#f3edf7', borderRadius: '8px' } as any}
              />
            </IonItem>
          </IonCol>

          <IonCol size="12">
            <IonButton
              expand="block"
              type="submit"
              disabled={loading}
              style={{
                '--background': '#b8a0d4',
                '--background-hover': '#a889c8',
                '--border-radius': '12px',
                '--color': '#fff',
                fontWeight: 'bold',
              } as any}
            >
              <IonIcon slot="start" icon={calculatorOutline} />
              Calcular Resumo
            </IonButton>
          </IonCol>

          {loading && (
            <IonCol size="12">
              <IonText color="medium" style={{ textAlign: 'center', display: 'block' }}>
                Processando...
              </IonText>
            </IonCol>
          )}
        </IonRow>
      </IonGrid>
    </form>
  );
};

export default FinanceiroForm;
