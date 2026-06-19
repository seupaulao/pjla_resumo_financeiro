# 📊 Resumo Financeiro - Médica PJ

## O que é o Projeto?

**Resumo Financeiro - Médica PJ** é uma aplicação mobile híbrida (Ionic + React) que funciona como uma ferramenta de cálculo e simulação financeira para profissionais médicos que trabalham como Pessoa Jurídica (PJ) sob o regime tributário de Simples Nacional (Anexo III).

### Objetivo Principal
Permitir que médicas PJ simulem suas obrigações fiscais, calculem automaticamente os tributos devidos e visualizem o resumo financeiro com base na receita declarada.

---

## Funcionalidades Principais

1. **Simulação de Cálculos Fiscais**
   - Calcula DAS (Simples Nacional) conforme faixas de faturamento
   - Calcula INSS (11% sobre pró-labore)
   - Calcula IRRF (Imposto de Renda Retido na Fonte)
   - Estrutura pró-labore vs lucro distribuível

2. **Persistência de Dados**
   - Armazena simulações em banco de dados SQLite local
   - Acesso offline completo
   - Histórico de simulações

3. **Exportação de Relatórios**
   - Exporta em Markdown
   - Compartilha via aplicativos nativos
   - Download de arquivos

4. **Navegação e Visualização**
   - Tela inicial com resumo geral
   - Criar nova simulação
   - Visualizar histórico
   - Detalhes de simulações individuais

---

## Arquitetura do Projeto

```
src/
├── pages/              # Páginas da aplicação
│   ├── Home.tsx       # Tela inicial - resumo e botões de ação
│   ├── NovaSimulacao.tsx  # Criar nova simulação
│   ├── Historico.tsx  # Listar simulações salvas
│   ├── Detalhes.tsx   # Visualizar detalhes de uma simulação
│   └── Home.css
├── components/         # Componentes reutilizáveis
│   ├── FinanceiroForm.tsx    # Formulário de entrada de dados
│   ├── ResumoCard.tsx        # Card com resultado do cálculo
│   ├── ExportarButtons.tsx   # Botões de exportação/compartilhamento
│   └── HistoricoList.tsx     # Lista de simulações
├── services/          # Lógica de negócio
│   └── database.ts    # Serviço de banco de dados SQLite
├── utils/             # Funções utilitárias
│   └── calculos.ts    # Funções de cálculo de tributos
├── types/             # Definições TypeScript
│   └── index.ts       # Interfaces e constantes
├── theme/             # Estilos CSS
│   └── variables.css  # Variáveis de tema
└── App.tsx            # Componente raiz e rotas
```

### Stack Tecnológico

**Frontend:**
- React 19.0.0
- TypeScript
- Ionic React 8.5.0
- React Router 5.3.4

**Build & Tooling:**
- Vite 5.4.21
- ESBuild

**Mobile:**
- Capacitor 8.4.0
- Capacitor Filesystem (para exportação)
- Capacitor Share (para compartilhar)
- Capacitor Community SQLite (banco de dados)

**Validação & Formulários:**
- React Hook Form 7.79.0
- Zod 4.4.3
- @hookform/resolvers 5.4.0

**Testing:**
- Vitest
- Cypress 13.5.0
- Testing Library

---

## Fluxo de Dados

### 1. Entrada de Dados
```
Usuário preenche formulário
    ↓
FinanceiroForm valida e envia para NovaSimulacao
```

### 2. Cálculos
```
DadosEntrada (receita, rbt12, % pró-labore)
    ↓
calcularSimulacao() em utils/calculos.ts
    ↓
Resultado: {DAS, INSS, IRRF, pró-labore líquido, lucro distribuível}
```

### 3. Persistência
```
Resultado calculado
    ↓
database.salvarSimulacao() salva em SQLite
    ↓
Retorna ID da simulação
```

### 4. Visualização
```
ResumoCard exibe resultado
    ↓
ExportarButtons oferece opções (Markdown, Compartilhar, Download)
```

---

## Detalhes Técnicos Importantes

### Database Schema
```sql
CREATE TABLE simulacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  data TEXT DEFAULT CURRENT_TIMESTAMP,
  receita REAL,
  rbt12 REAL,
  percentualProLabore REAL,
  das REAL,
  inss REAL,
  irrf REAL,
  prolaboreBruto REAL,
  prolaboreLiquido REAL,
  lucroDistribuivel REAL,
  totalLiquido REAL,
  descricao TEXT
)
```

### Fórmulas de Cálculo

**DAS (Simples Nacional - Anexo III):**
- RBT12 ≤ 180k: receita × 6%
- RBT12 ≤ 360k: (receita × 11.2%) - (9.360 × receita / rbt12)
- RBT12 ≤ 720k: (receita × 13.5%) - (17.640 × receita / rbt12)
- RBT12 ≤ 1.8M: (receita × 16%) - (35.640 × receita / rbt12)
- RBT12 ≤ 3.6M: (receita × 21%) - (125.640 × receita / rbt12)
- RBT12 > 3.6M: (receita × 33%) - (648.000 × receita / rbt12)

**INSS:** Min(pró-labore × 11%, 7507.49)

**IRRF:** Tabela progressiva com 4 alíquotas (0%, 7.5%, 15%, 22.5%, 27.5%)

### Rotas da Aplicação
```
/home          → Tela inicial
/nova-simulacao → Criar simulação
/historico     → Listar simulações
/detalhes/:id  → Detalhe da simulação
```

---

## Variáveis de Tema

**Paleta de cores:**
- Primária: `#b8a0d4` (roxo principal)
- Secundária: `#6b4a8c` (roxo escuro)
- Fundo: `#faf5ff` (roxo muito claro)
- Gradient: Linear de `#e8ddf2` a `#d8c8e8`

---

## Configuração TypeScript

- Target: ESNext
- Module: ESNext
- Module Resolution: bundler
- Strict Mode: ativado
- JSX: react-jsx
- ignoreDeprecations: 5.0

---

## Próximas Etapas de Desenvolvimento

- [ ] Implementar sincronização em nuvem
- [ ] Adicionar gráficos de evolução mensal
- [ ] Exportar em PDF
- [ ] Integração com contadores
- [ ] Dark mode
- [ ] Suporte a múltiplos idiomas
- [ ] Push notifications para recordações de pagamento

---

---

# 🤖 Prompt Final para Gerar o Projeto

## Instruções para IA Generativa (Claude, ChatGPT, etc.)

```
Você vai criar uma aplicação Ionic React completa chamada "Resumo Financeiro - Médica PJ".

## Objetivo
Criar uma ferramenta mobile que permita profissionais médicas PJ (Pessoa Jurídica) simular 
suas obrigações fiscais sob Simples Nacional (Anexo III), calculando DAS, INSS, IRRF e 
estruturando pró-labore vs lucro distribuível.

## Stack
- Frontend: React 19, TypeScript, Ionic React 8.5, Vite
- Mobile: Capacitor 8.4, SQLite Community
- Validação: React Hook Form, Zod
- Testing: Vitest, Cypress

## Estrutura de Pastas
src/
  ├── pages/ (Home, NovaSimulacao, Historico, Detalhes)
  ├── components/ (FinanceiroForm, ResumoCard, ExportarButtons, HistoricoList)
  ├── services/ (database.ts com SQLite)
  ├── utils/ (calculos.ts com fórmulas fiscais)
  ├── types/ (interfaces e constantes)
  ├── theme/ (variáveis CSS roxo/lavanda)
  └── App.tsx (router com 4 rotas)

## Tipos de Dados
interface Simulacao {
  id?: number;
  data: string;
  receita: number;
  rbt12: number;
  percentualProLabore: number;
  das: number;
  inss: number;
  irrf: number;
  prolaboreBruto: number;
  prolaboreLiquido: number;
  lucroDistribuivel: number;
  totalLiquido: number;
  descricao?: string;
}

## Fórmulas de Cálculo
DAS: Tabela progressiva conforme RBT12 (6% a 33%)
INSS: 11% sobre pró-labore, máximo R$ 7507.49
IRRF: Tabela de 4 alíquotas progressivas (0%, 7.5%, 15%, 22.5%, 27.5%)

## Funcionalidades
1. Tela Home com resumo total de simulações
2. Nova Simulação: formulário com receita, rbt12, % pró-labore
3. Cálculo automático ao submeter
4. Visualização em card com todos os valores
5. Opções de exportar (Markdown) e compartilhar
6. Histórico com todas as simulações
7. Detalhes de cada simulação
8. Persistência em SQLite local

## UI/UX
- Cores: roxo/lavanda (primária #b8a0d4, fundo #faf5ff)
- Rounded corners em cards (16px)
- Responsive grid layout
- Emojis para visual appeal (💰, 📊, 🧾, etc)
- Ícones do Ionicons

## Requisitos Funcionais
- Validação de formulário (receita > 0, rbt12 > 0)
- Redondamento em 2 casas decimais
- Formatação em moeda brasileira (R$ com pontos)
- Datas em pt-BR
- Interface clean e intuitiva

## Padrão de Código
- Componentes funcionais com hooks
- Tipos TypeScript estritos
- Separação clara: componentes vs páginas vs serviços
- Async/await para operações assincronas
- Try/catch em operações de banco de dados

Crie todo o código necessário para que a aplicação funcione 
completamente, inclua package.json, tsconfig.json, vite.config.ts,
ionic.config.json, capacitor.config.ts e todos os componentes.
```

---

**Gerado em:** 2026-06-18  
**Versão do Projeto:** 0.0.1  
**Status:** ✅ Funcional - Sem erros de compilação
