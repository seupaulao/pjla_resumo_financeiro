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

import { DadosEntrada } from '../types';
import { calculatorOutline } from 'ionicons/icons';

interface FinanceiroFormProps {
  onSubmit: (dados: DadosEntrada) => void;
  loading?: boolean;
}

function formatPct(v: number): string {
  return (v * 100).toFixed(4).replace('.', ',');
}

function parsePct(str: string): number | null {
  let s = str.trim();
  if (s === '') return null;
  const ultimo = s[s.length - 1];
  if (ultimo === ',' || ultimo === '.') return null;
  const normalizado = s.replace(',', '.');
  const num = parseFloat(normalizado);
  if (isNaN(num) || num < 0 || num > 100) return null;
  return Math.round(num * 10000) / 10000 / 100;
}

const FinanceiroForm: React.FC<FinanceiroFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<DadosEntrada>({
    receita: 0,
    rbt12: 0,
    percentualProLabore: 0.28,
    descricao: '',
  });

  const [prolaboreText, setProlaboreText] = useState(formatPct(0.28));
  const [prolaboreError, setProlaboreError] = useState('');

  const handleProlaboreChange = (value: string | null | undefined) => {
    const v = value ?? '';
    if (v.length > 8) return;
    if (!/^[\d,.]*$/.test(v)) return;
    setProlaboreText(v);

    if (v === '' || v === ',' || v === '.') {
      setProlaboreError('Valor obrigatório');
      return;
    }
    const parsed = parsePct(v);
    if (parsed === null) {
      setProlaboreError('Digite um número válido (use vírgula)');
      return;
    }
    setProlaboreError('');
    setFormData({ ...formData, percentualProLabore: parsed });
  };

  const handleProlaboreBlur = () => {
    const v = prolaboreText.trim();
    if (v === '' || v === ',' || v === '.') {
      setProlaboreError('Valor obrigatório');
      return;
    }
    const parsed = parsePct(v);
    if (parsed === null) {
      setProlaboreError('Valor deve estar entre 0 e 100');
      return;
    }
    setProlaboreError('');
    setProlaboreText(formatPct(parsed));
    setFormData({ ...formData, percentualProLabore: parsed });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.receita || formData.receita <= 0) {
      alert('Receita bruta deve ser maior que 0');
      return;
    }
    if (!formData.rbt12 || formData.rbt12 <= 0) {
      alert('RBT12 deve ser maior que 0');
      return;
    }

    const p = parsePct(prolaboreText);
    if (p === null) {
      setProlaboreError('Pró-labore deve ser entre 0% e 100%');
      return;
    }

    onSubmit({ ...formData, percentualProLabore: p });
  };

  const inputStyle = {
    '--background': '#f3edf7',
    borderRadius: '8px',
    margin: '12px 0',
    border: prolaboreError ? '2px solid #d4a8a8' : '2px solid transparent',
  } as any;

  return (
    <form onSubmit={handleSubmit}>
      <IonGrid className="ion-padding" style={{ background: '#faf5ff', borderRadius: '16px' }}>
        <IonRow>
          <IonCol size="12">
            <IonItem color="transparent" style={{ '--background': 'transparent', paddingTop: '12px' } as any}>
              <IonLabel position="stacked" style={{ color: '#9c7bb8' }}>
                Receita Bruta do Mês *
              </IonLabel>
              <IonInput
                type="number"
                value={formData.receita || ''}
                placeholder="Ex: 20950"
                onIonChange={(e) => setFormData({ ...formData, receita: Number(e.detail.value) })}
                required
                style={{ '--background': '#f3edf7', borderRadius: '8px', margin: '12px 0' } as any}
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
                style={{ '--background': '#f3edf7', borderRadius: '8px', margin: '12px 0' } as any}
              />
            </IonItem>
          </IonCol>

          <IonCol size="12">
            <IonItem
              color="transparent"
              style={{ '--background': 'transparent' } as any}
            >
              <IonLabel position="stacked" style={{ color: '#9c7bb8' }}>
                % Pró-labore (0 a 100) *
              </IonLabel>
              <IonInput
                type="text"
                inputmode="decimal"
                value={prolaboreText}
                placeholder="Ex: 28,0000"
                onIonInput={(e) => handleProlaboreChange(e.detail.value)}
                onIonBlur={handleProlaboreBlur}
                style={inputStyle}
              />
              {prolaboreError ? (
                <IonText slot="helper" style={{ color: '#d4a8a8', fontSize: '0.85rem' }}>
                  {prolaboreError}
                </IonText>
              ) : (
                <IonText slot="helper" style={{ color: '#9c7bb8', fontSize: '0.85rem' }}>
                  Use vírgula para decimais. Ex: 28,5000
                </IonText>
              )}
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
                style={{ '--background': '#f3edf7', borderRadius: '8px', margin: '12px 0' } as any}
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
