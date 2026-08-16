# 📘 GEMINI.md — Guia Completo para Geração de Dashboards de Cronograma de Estudo

> **Objetivo:** Este documento contém TODAS as informações necessárias para que uma inteligência artificial consiga replicar com maestria o desenvolvimento de um painel interativo de cronograma de estudo para qualquer concurso público ou cargo.
>
> **Projeto de referência:** `TCE-MA — Painel de Estudos` (arquivo `index.html` nesta raiz)
>
> **Autor:** Nacarat Soluções Digitais

---

## 📌 1. VISÃO GERAL DO PRODUTO

O produto é um **dashboard HTML único e autocontido** (single-file app) que serve como painel de estudos para preparação para concursos públicos. Ele roda **100% no navegador**, sem backend obrigatório, com persistência via `localStorage`. Opcionalmente suporta sincronização em nuvem via Vercel + Upstash Redis.

### 1.1. Características Essenciais

- **Arquivo HTML único** com CSS e JavaScript embutidos (zero dependências externas além de Google Fonts)
- **Design System Nacarat** integrado (tokens CSS, modo claro/escuro, tipografia premium)
- **3 abas principais:** Cronograma Diário, Controle de Revisões Espaçadas, Matriz do Edital
- **4 cards de métricas no topo:** Contagem Regressiva, Dias Concluídos, Revisões Espaçadas (%), Questões Praticadas
- **Filtros avançados:** por semana, status (pendente/concluído), busca textual, prioridade e disciplina
- **Persistência local** via `localStorage` com export/import JSON para backup
- **Modo claro/escuro** com alternância suave
- **Toast notifications** para feedback visual de salvamento
- **Modal de confirmação** para reset de progresso
- **Responsividade completa** para desktop e mobile

---

## 🎨 2. DESIGN SYSTEM NACARAT — ESPECIFICAÇÃO COMPLETA

### 2.1. Fontes (Google Fonts)

Importar obrigatoriamente via `<link>` no `<head>`:

```
DM Sans (pesos: 300, 400, 500, 600, 700) — corpo da interface
Outfit (pesos: 400, 500, 600, 700, 800) — títulos, métricas, badges
Playfair Display (pesos: 600, 700) — opcional, títulos editoriais
```

**Regras de uso:**
- `font-family: 'DM Sans'` → Todo o corpo da interface (botões, tabelas, inputs, textos)
- `font-family: 'Outfit'` → Títulos H1, valores de métricas, badges de semana/dia, tabs
- `font-family: 'Playfair Display'` → Apenas destaques editoriais opcionais

### 2.2. Tokens CSS — Modo Claro (`:root`)

```css
/* Identidade do Produto (SaaS / Aplicação Web) */
--c-brand: #059669;
--c-brand-dark: #047857;
--c-brand-light: #D1FAE5;
--c-brand-subtle: #ECFDF5;
--c-brand-text: #064E3B;

/* Identidade Institucional Nacarat */
--brand-gold: #E8951A;
--brand-gold-hover: #C27A13;
--brand-gold-light: #FEF3C7;
--brand-gold-text: #92400E;
--navy-brand: #1E3B6A;
--navy-brand-dark: #152C52;
--navy-brand-subtle: #EFF6FF;

/* Superfícies e Neutros */
--c-bg: #F7F7F5;
--c-surface: #FFFFFF;
--c-surface-2: #FAFAFA;
--c-surface-hover: #F3F4F6;
--c-border: #E5E4E2;
--c-border-soft: #F0EFEE;
--c-border-focus: #059669;

/* Tipografia e Contrastes de Texto */
--c-text: #1A1917;
--c-text-muted: #706E6B;
--c-text-faint: #A6A39F;

/* Cores Semânticas de Prioridade & Status */
--prio-high-bg: #FEE2E2;  --prio-high-text: #991B1B;  --prio-high-border: #FCA5A5;  --prio-high-dot: #DC2626;
--prio-med-bg: #FEF3C7;   --prio-med-text: #92400E;   --prio-med-border: #FCD34D;   --prio-med-dot: #D97706;
--prio-low-bg: #D1FAE5;   --prio-low-text: #064E3B;   --prio-low-border: #6EE7B7;   --prio-low-dot: #059669;
--status-done-bg: #ECFDF5; --status-done-border: #A7F3D0; --status-done-text: #047857;

/* Geometria */
--r-card: 14px;
--r-btn: 10px;
--r-chip: 999px;
--r-input: 10px;

/* Sombras */
--shadow-subtle: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-card: 0 2px 8px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04);
--shadow-card-hover: 0 6px 18px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
--shadow-float: 0 8px 24px rgba(0, 0, 0, 0.10), 0 2px 6px rgba(0, 0, 0, 0.06);

/* Gradientes */
--grad-brand: linear-gradient(135deg, #059669 0%, #047857 100%);
--grad-gold: linear-gradient(135deg, #E8951A 0%, #C27A13 100%);
--grad-navy: linear-gradient(135deg, #1E3B6A 0%, #152C52 100%);
--grad-card-header: linear-gradient(180deg, rgba(247, 247, 245, 0.7) 0%, rgba(255, 255, 255, 0) 100%);
```

### 2.3. Tokens CSS — Modo Escuro (`[data-theme="dark"]`)

```css
--c-bg: #0B0F19;
--c-surface: #151E33;
--c-surface-2: #1E293B;
--c-surface-hover: #263554;
--c-border: rgba(255, 255, 255, 0.10);
--c-border-soft: rgba(255, 255, 255, 0.06);
--c-border-focus: #10B981;
--c-text: #F8FAFC;
--c-text-muted: #94A3B8;
--c-text-faint: #64748B;
--c-brand: #10B981;
--c-brand-dark: #059669;
--c-brand-light: rgba(16, 185, 129, 0.18);
--c-brand-subtle: rgba(16, 185, 129, 0.08);
--c-brand-text: #6EE7B7;
--brand-gold: #F59E0B;
--brand-gold-light: rgba(245, 158, 11, 0.15);
--brand-gold-text: #FDE68A;
--navy-brand: #3B82F6;
--navy-brand-subtle: rgba(59, 130, 246, 0.12);

/* Prioridades no escuro usam transparências rgba em vez de hex sólido */
--prio-high-bg: rgba(239, 68, 68, 0.15);
--prio-high-text: #FCA5A5;
--prio-high-border: rgba(239, 68, 68, 0.3);
/* ... (mesmo padrão para média e baixa, com suas respectivas cores) */

/* Sombras no escuro são mais intensas */
--shadow-subtle: 0 1px 3px rgba(0, 0, 0, 0.2);
--shadow-card: 0 4px 12px rgba(0, 0, 0, 0.25);
--shadow-card-hover: 0 8px 24px rgba(0, 0, 0, 0.35);
--shadow-float: 0 12px 32px rgba(0, 0, 0, 0.5);
```

### 2.4. Componentes CSS Obrigatórios

O HTML deve conter as seguintes classes CSS com seus estilos completos:

| Componente | Classe CSS | Descrição |
|---|---|---|
| **Botão Primário** | `.btn .btn-primary` | Fundo `--c-brand`, texto branco, sombra, `active:scale(0.97)` |
| **Botão Secundário** | `.btn .btn-secondary` | Fundo `--c-surface`, borda `--c-border` |
| **Botão Ghost** | `.btn .btn-ghost` | Transparente, hover suave |
| **Botão Destrutivo** | `.btn .btn-danger-ghost` | Texto vermelho, hover vermelho claro |
| **Badge de Nuvem** | `.cloud-badge` | Pílula com status: `.connected`, `.syncing` |
| **Card de Métrica** | `.stat-card` | Barra colorida no topo `::before`, hover com elevação |
| **Aba/Tab** | `.tab-btn` | Segmented pill bar, `.active` com fundo colorido |
| **Card de Dia** | `.day-card` | Cabeçalho + corpo em grid 2 colunas + rodapé |
| **Bloco de Estudo** | `.block-card` | Sub-card dentro do `.day-card` com tag, matéria e checkbox |
| **Pílula de Prioridade** | `.prio-pill` | `.prio-alta`, `.prio-media`, `.prio-baixa` com dot colorido |
| **Checkbox Custom** | `.custom-checkbox-container` | Label interativa com checkmark animado |
| **Botão de Revisão** | `.rev-check-btn` | `.checked` para concluído |
| **Barra de Progresso** | `.progress-bar-container` + `.progress-bar-fill` | Barra horizontal animada |
| **Toast** | `.toast` | Notificação fixa no canto inferior direito |
| **Modal de Reset** | `.modal-overlay` + `.modal-card` | Overlay com backdrop blur |
| **Filtros** | `.filter-bar` | Barra horizontal com selects, inputs e busca |

---

## 🏗️ 3. ARQUITETURA HTML — ESTRUTURA DO ARQUIVO

O HTML segue esta hierarquia exata:

```
<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
    <meta charset + viewport>
    <title> (formato: "Painel de Estudos [CONCURSO] | [CARGO] • Nacarat")
    <link> Google Fonts (DM Sans + Outfit + Playfair Display)
    <style> TODO O CSS EMBUTIDO AQUI </style>
</head>
<body>
    <header>
        .header-content
            .brand-container (logo badge "N" + título + tag + subtítulo)
            .header-actions (badge nuvem + tema + exportar + importar + resetar)
    </header>

    <div class="container">
        <!-- 4 CARDS DE MÉTRICAS -->
        .stats-grid
            .stat-card.stat-countdown (contagem regressiva)
            .stat-card.stat-days (dias concluídos + barra de progresso)
            .stat-card.stat-revs (% revisões + barra de progresso)
            .stat-card.stat-questions (questões praticadas)

        <!-- NAVEGAÇÃO DE ABAS -->
        .tabs-nav-container
            .tab-btn (Cronograma Diário)
            .tab-btn (Controle de Revisões)
            .tab-btn (Matriz & Distribuição do Edital)

        <!-- ABA 1: CRONOGRAMA DIÁRIO -->
        #tab-crono .tab-pane
            .filter-bar (semana, status, busca)
            .schedule-grid #scheduleList (cards gerados via JS)

        <!-- ABA 2: REVISÕES ESPAÇADAS -->
        #tab-revisoes .tab-pane
            .filter-bar (prioridade, disciplina, busca)
            .table-card > table (cabeçalho + tbody dinâmico)

        <!-- ABA 3: EDITAL & DISTRIBUIÇÃO -->
        #tab-edital .tab-pane
            .table-card > table (dados estáticos do edital)

        <footer> (assinatura Nacarat)
    </div>

    <!-- MODAL DE RESET -->
    .modal-overlay#resetModal > .modal-card

    <!-- TOAST -->
    #toast .toast

    <script> TODO O JAVASCRIPT EMBUTIDO AQUI </script>
</body>
</html>
```

---

## 📊 4. ESTRUTURAS DE DADOS JAVASCRIPT

### 4.1. Array `daysData` — Cronograma Diário

Cada entrada representa UM DIA de estudo:

```javascript
const daysData = [
    {
        "fase": "Fase 1: Fundações",   // Nome da fase (agrupamento semântico)
        "semana": 1,                    // Número da semana (1-indexed, usado nos filtros)
        "data": "18/08/2026",           // Data no formato DD/MM/AAAA
        "dia": "Segunda",              // Nome do dia da semana
        "b1_mat": "Dir. Constitucional", // Matéria do Bloco 1
        "b1_top": "CF/88: conceito...", // Tópico detalhado do Bloco 1
        "b2_mat": "Raciocínio Lógico", // Matéria do Bloco 2
        "b2_top": "Estruturas lógicas...", // Tópico detalhado do Bloco 2
        "exercicios": "30q Dir. Const. + 30q Rac. Lógico" // Descrição dos exercícios
    },
    // ... repetir para cada dia de estudo
];
```

**Regras de preenchimento:**
- Cada dia tem exatamente 2 blocos de estudo (Bloco 1 e Bloco 2)
- Bloco 1 geralmente é matéria de ALTA prioridade, Bloco 2 de MÉDIA ou complementar
- Matérias de BAIXA prioridade entram apenas nas últimas semanas
- Revisões espaçadas (D+1, D+7, D+30) são indicadas no campo `b1_top`/`b2_top` com prefixo "🔄 Revisão D+X:"
- Simulados são indicados com "📝 Simulado temático:" ou "📝 SIMULADO FINAL:"
- Reforços de pontos fracos com "🎯 Reforço:"
- Revisão intensiva da última semana com "⚡ Revisão intensiva:"

### 4.2. Array `revData` — Revisões Espaçadas

Cada entrada representa UM TÓPICO e seus ciclos de revisão:

```javascript
const revData = [
    {
        "id": "c1",                    // ID único (prefixo da disciplina + sequencial)
        "prio": "alta",               // "alta" | "media" | "baixa"
        "disc": "Dir. Constitucional", // Nome da disciplina (exato, para filtros)
        "topico": "CF/88: conceito...", // Descrição do tópico
        "estudo": "18/08/2026",       // Data do estudo inicial
        "d1": "19/08/2026",           // Data da revisão D+1
        "d7": "25/08/2026",           // Data da revisão D+7
        "d30": "17/09/2026"           // Data da revisão D+30 (null se não tiver)
    },
    // ... repetir para cada tópico
];
```

**Convenção de IDs:**
- `c1, c2, c3...` → Direito Constitucional
- `a1, a2, a3...` → Direito Administrativo
- `g1, g2, g3...` → Gestão de Contratos
- `e1, e2, e3...` → Execução Orçamentária
- `i1, i2, i3...` → Informática
- `r1, r2, r3...` → Raciocínio Lógico
- `ce1, ce2...` → Controle Externo
- `l1, l2...` → Legislação Específica
- `h1, h2...` → História
- `hg1, hg2...` → Geografia
- `dh1, dh2...` → Direitos Humanos

**Importante:** Matérias de baixa prioridade (com estudo tardio) podem ter `d30: null` se não houver tempo para revisão de 30 dias antes da prova.

### 4.3. Objeto `state` — Persistência

```javascript
let state = {
    days: {},           // { "day_0_b1": true, "day_0_b2": false, "day_0_ex": true, ... }
    reviews: {},        // { "c1_d1": true, "c1_d7": false, "c1_d30": false, ... }
    notes: {},          // { "day_0": "Anotação do dia...", ... }
    questionsDone: {}   // { "day_0": 60, "day_1": 45, ... }
};
```

### 4.4. Chaves de LocalStorage

```javascript
const STORAGE_KEY = "[SIGLA_CONCURSO]_STUDY_TRACKER_V1"; // Ex: "TCE_MA_STUDY_TRACKER_V1"
const THEME_KEY = "[SIGLA_CONCURSO]_THEME_V1";           // Ex: "TCE_MA_THEME_V1"
```

**IMPORTANTE:** Cada concurso DEVE ter chaves únicas para não conflitar no mesmo navegador.

---

## ⚙️ 5. FUNÇÕES JAVASCRIPT OBRIGATÓRIAS

### 5.1. Tema (Light/Dark)

```
initTheme()     → Carrega tema salvo no localStorage, default "light"
setTheme(theme) → Aplica data-theme e atualiza ícone/texto do botão
toggleTheme()   → Alterna entre "light" e "dark"
```

### 5.2. Persistência

```
loadState()     → Carrega state do localStorage
saveState()     → Salva state no localStorage + atualiza métricas + agenda sync nuvem + showToast
showToast(msg)  → Exibe notificação temporária (2.6s) no canto inferior direito
```

### 5.3. Sincronização em Nuvem (OPCIONAL — apenas para deploy Vercel)

```
updateCloudBadge(status, text) → Atualiza visual do badge: "connected" | "syncing" | "offline"
fetchCloudState()              → GET /api/progresso com AbortController (timeout 3.5s)
scheduleCloudSave()            → POST debounced (600ms) para /api/progresso
syncNow()                      → Forçar sincronização manual
```

**Para uso local (file://), a detecção `window.location.protocol === 'file:'` pula toda lógica de nuvem.**

Se o dashboard for APENAS local (como indicado pelo usuário para novos concursos), a sincronização em nuvem pode ser REMOVIDA completamente, mantendo apenas localStorage + export/import JSON.

### 5.4. Navegação

```
switchTab(tabId) → Alterna abas: 'crono', 'revisoes', 'edital'
```

### 5.5. Métricas

```
updateMetrics() → Calcula e renderiza:
    - Contagem regressiva (dias até a prova)
    - Dias concluídos (ambos blocos marcados = 1 dia concluído)
    - % de revisões espaçadas concluídas
    - Total de questões praticadas
```

### 5.6. Ações de Progresso

```
toggleDayBlock(dayIdx, blockKey) → Marca/desmarca bloco de estudo ("b1" ou "b2")
toggleExercise(dayIdx)           → Marca/desmarca exercícios do dia (auto-preenche 60 questões)
updateQuestionsCount(dayIdx, val) → Atualiza contagem manual de questões
updateNote(dayIdx, val)          → Salva anotação do dia
toggleReview(revId, cycleKey)    → Marca/desmarca revisão ("d1", "d7" ou "d30")
```

### 5.7. Renderização

```
renderSchedule() → Renderiza todos os cards de dia com filtros aplicados
renderRevisoes() → Renderiza tabela de revisões com filtros aplicados
```

### 5.8. Backup

```
exportData()       → Exporta state como arquivo JSON com data no nome
importData(event)  → Importa arquivo JSON e restaura state
```

### 5.9. Reset

```
openResetModal()          → Exibe modal de confirmação
closeResetModal()         → Fecha modal
confirmResetExecution()   → Limpa state e re-renderiza tudo
```

### 5.10. Listeners de Ciclo de Vida

```javascript
// Carrega nuvem ao abrir
fetchCloudState();

// Recarrega ao alternar abas ou desbloquear tela do celular
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") fetchCloudState();
});
window.addEventListener("focus", () => fetchCloudState());
```

---

## 📐 6. METODOLOGIA PEDAGÓGICA DO CRONOGRAMA

### 6.1. Informações Necessárias do Usuário

Para gerar um cronograma, o usuário DEVE fornecer:

1. **Concurso e Cargo** (ex: "Transpetro — Profissional de Nível Superior — Engenharia Mecânica")
2. **Banca examinadora** (ex: Cesgranrio, Cebraspe, FGV)
3. **Data da prova** (para contagem regressiva)
4. **Conteúdo programático completo do edital** (todas as disciplinas e tópicos)
5. **Disponibilidade diária** (ex: 4h/dia, 6h/dia)
6. **Dias da semana de estudo** (ex: segunda a sábado)
7. **Classificação de prioridade das matérias** (alta/média/baixa)
8. **Conhecimento prévio** por matéria (✅ sim / ❌ do zero)
9. **Matérias a EXCLUIR** do plano (ex: "Português não será incluído")
10. **Meta de questões por dia** (ex: 40, 60)

### 6.2. Fases do Cronograma

O cronograma deve ser dividido em fases progressivas:

| Fase | % do Tempo | Foco |
|---|---|---|
| **Fase 1: Fundações** | ~30% | Conteúdo novo de todas as disciplinas de alta e média prioridade |
| **Fase 2: Aprofundamento** | ~25% | Revisões D+7 e D+30 + conteúdo complementar |
| **Fase 3: Consolidação** | ~25% | Simulados temáticos + revisões D+30 + matérias de baixa prioridade |
| **Fase 4: Finalização** | ~15% | Simulados gerais + revisões finais + reforço de pontos fracos |
| **Fase 5: Revisão Geral** | ~5% (última semana) | Revisão intensiva com flashcards + simulado final + descanso pré-prova |

### 6.3. Estrutura Diária Padrão

| Bloco | Duração | Conteúdo |
|---|---|---|
| Bloco 1 | 2h | Matéria de alta prioridade (conteúdo novo OU revisão espaçada) |
| Bloco 2 | 2h | Matéria de média prioridade (conteúdo novo OU revisão espaçada) |
| Exercícios | Fora das 4h | ~30 questões por matéria estudada no dia |

**Variações possíveis:**
- Para 6h/dia: 3 blocos de 2h cada
- Para 3h/dia: 2 blocos (1.5h + 1.5h) ou 1 bloco de 3h alternando matérias

### 6.4. Sistema de Revisões Espaçadas

```
Estudo inicial (Dia 0)
    └── D+1 (dia seguinte) — 30 min de recall ativo
        └── D+7 (1 semana depois) — 30 min de releitura + mapas mentais
            └── D+30 (1 mês depois) — 30 min de questões focadas
```

**Regras:**
- Matérias de ALTA e MÉDIA prioridade: ciclo completo D+1, D+7, D+30
- Matérias de BAIXA prioridade (entrada tardia): apenas D+1 e D+7 (sem D+30 se a prova estiver próxima, `d30: null`)
- Revisões integram-se aos blocos do dia, indicadas no campo de tópico com "🔄 Revisão D+X:"

### 6.5. Distribuição de Sessões por Matéria

Calcular com base no peso, na quantidade de tópicos do edital e no conhecimento prévio:

| Prioridade | Peso de Sessões | Exemplo |
|---|---|---|
| Alta (com base) | 8-12 sessões de conteúdo + 8-12 de revisão | Dir. Constitucional: 10+12 = 22 sessões |
| Alta (do zero) | 10-15 sessões de conteúdo + 10-12 de revisão | — |
| Média (com base) | 4-8 sessões + 5-8 de revisão | Controle Externo: 6+6 = 12 sessões |
| Média (do zero) | 7-10 sessões + 8-10 de revisão | Raciocínio Lógico: 8+8 = 16 sessões |
| Baixa (entrada tardia) | 4-6 sessões + 2-3 de revisão | História do MA: 6+3 = 9 sessões |

### 6.6. Intercalação de Matérias

- **Nunca** colocar a mesma matéria nos dois blocos do mesmo dia
- **Alternar** entre disciplinas de naturezas diferentes (ex: Direito + Lógica, Gestão + Informática)
- **Dias fixos:** Estabelecer dias preferenciais por matéria (ex: Dir. Constitucional sempre às Seg/Qua, Dir. Administrativo às Ter/Qui)

### 6.7. Filtro de Semanas no Select

Gerar as opções do `<select>` de semanas dinamicamente com formato:
```
Semana X (DD/MM a DD/MM)
```
Com indicadores visuais nas semanas especiais:
- `🟢 Baixa Prio` para semanas de entrada de matérias de baixa prioridade
- `⚡ Revisão Geral` para a última semana

---

## 🔧 7. ADAPTAÇÕES POR CONCURSO

### 7.1. Quando o Dashboard é APENAS Local (sem nuvem)

- **REMOVER** completamente: badge de nuvem, `fetchCloudState()`, `scheduleCloudSave()`, `syncNow()`, `updateCloudBadge()`
- **MANTER:** botão de Exportar/Importar JSON como mecanismo de backup
- **MANTER:** persistência via `localStorage`

### 7.2. Quando o Dashboard Precisa de Sincronização em Nuvem

- Manter a API serverless em `api/progresso.js`
- Badge de nuvem no cabeçalho
- Toda a lógica de `fetchCloudState()` e `scheduleCloudSave()`
- Listeners de `visibilitychange` e `focus`

### 7.3. Personalização do Título e Metadados

Substituir em cada novo concurso:

```html
<title>Painel de Estudos [CONCURSO] | [CARGO] • Nacarat</title>
```

No cabeçalho:
```html
<h1>[CONCURSO] • Painel de Estudos <span class="product-tag">Nacarat SaaS</span></h1>
<p>[Cargo completo] ([Banca] [Ano])</p>
```

### 7.4. Adaptação dos Cards de Métricas

- **Contagem Regressiva:** Alterar a data da prova no JS (`new Date("AAAA-MM-DDT08:00:00")`)
- **Dias Concluídos:** Alterar o total (`/ XX dias`)
- **Questões Praticadas:** Alterar a meta total (calcular: dias × questões/dia)
- **Texto da prova:** Alterar no card de countdown

### 7.5. Aba 3 — Matriz do Edital

A tabela estática da aba 3 deve conter:

| Coluna | Descrição |
|---|---|
| Disciplina | Nome completo da matéria |
| Prioridade | Pílula `.prio-alta`, `.prio-media` ou `.prio-baixa` |
| Conhecimento Prévio | ✅ Sim (Base Sólida) / ❌ Do Zero / 🎯 Foco na Reta Final |
| Sessões de Conteúdo Novo | Quantidade estimada |
| Sessões de Revisão | Quantidade estimada |
| Total de Sessões | Soma |
| Carga Horária Total | Total × 2h |

---

## 📝 8. CHECKLIST DE GERAÇÃO

Ao criar um novo painel de estudos para qualquer concurso, seguir esta ordem:

- [ ] 1. Receber e validar todas as informações do item 6.1
- [ ] 2. Criar a pasta do concurso com o arquivo `Conteúdo.md` (edital)
- [ ] 3. Definir prioridades das matérias (alta/média/baixa)
- [ ] 4. Calcular quantidade de sessões por matéria
- [ ] 5. Montar o array `daysData` completo (dia a dia, de segunda a sábado)
- [ ] 6. Montar o array `revData` completo (cada tópico com datas D+1, D+7, D+30)
- [ ] 7. Definir as fases do cronograma (Fundações → Aprofundamento → Consolidação → Finalização → Revisão)
- [ ] 8. Intercalar revisões espaçadas nos dias corretos
- [ ] 9. Inserir simulados temáticos (1 rodada na fase 3) e simulado final (último dia útil)
- [ ] 10. Gerar o HTML completo com CSS + dados + JS
- [ ] 11. Ajustar `STORAGE_KEY`, `THEME_KEY` e data da prova
- [ ] 12. Popular a tabela estática da Aba 3 (Matriz do Edital)
- [ ] 13. Gerar opções do select de semanas
- [ ] 14. Gerar opções do select de disciplinas (para filtro de revisões)
- [ ] 15. Testar abrindo o arquivo HTML direto no navegador

---

## 🔒 9. REGRAS INVIOLÁVEIS

1. **NUNCA** usar frameworks JS (React, Vue, Angular). É HTML+CSS+JS puro.
2. **NUNCA** usar TailwindCSS. Usar apenas CSS vanilla com tokens via variáveis CSS.
3. **NUNCA** depender de CDN para funcionalidades core. Google Fonts é a única exceção.
4. **SEMPRE** manter o arquivo 100% funcional como arquivo local (`file://`).
5. **SEMPRE** usar o Design System Nacarat com todos os tokens documentados.
6. **SEMPRE** manter modo claro/escuro funcional.
7. **SEMPRE** incluir exportação/importação JSON para backup.
8. **SEMPRE** usar `localStorage` com chaves ÚNICAS por concurso.
9. **SEMPRE** incluir toast notifications para feedback de salvamento.
10. **SEMPRE** manter a responsividade (funcionar bem em celular e desktop).

---

## 🏛️ 10. ASSINATURA

Em todo rodapé de dashboard:

```html
<footer>
    <div class="footer-brand-signature">
        <span>Nacarat Soluções Digitais</span> • <span>Assistente Digital Micro-SaaS</span>
    </div>
    <p>"Colocamos tecnologia para trabalhar por você."</p>
</footer>
```

---

> **Este documento é a fonte da verdade para a replicação do sistema.**
> Qualquer IA que o leia deve ser capaz de gerar um dashboard interativo completo para qualquer concurso público, mantendo a qualidade visual e funcional do projeto de referência TCE-MA.
