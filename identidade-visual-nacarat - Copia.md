# 🎨 Manual de Identidade Visual e Design System — Nacarat

> **Guia Oficial de Marca, Design Tokens, Tipografia, Cores e Componentes de Interface**  
> *Versão:* 1.0.0  
> *Produto:* **Assistente Digital Micro-SaaS (Nacarat SaaS)**  
> *Mantenedora:* **Nacarat Soluções Digitais (Nacarat SD)**

---

## 📌 1. Visão Geral da Marca e Arquitetura

O ecossistema **Nacarat** opera sob duas camadas complementares:
1. **Nacarat Soluções Digitais (Institucional / Agência de Tecnologia):** Responsável pela marca-mãe, vitrines comerciais, landing pages e relacionamento corporativo.
2. **Assistente Digital Micro-SaaS (Produto / Aplicação):** Plataforma web multi-tenant adaptável focada em automação de atendimento, CRM e agendamento inteligente via WhatsApp.

```
┌─────────────────────────────────────────────────────────────┐
│             NACARAT SOLUÇÕES DIGITAIS (Marca-Mãe)           │
│         "Colocamos tecnologia para trabalhar por você"      │
│  Paleta: Laranja Ouro (#e8951a) + Azul Profundo (#1e3b6a)  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│          ASSISTENTE DIGITAL MICRO-SAAS (Aplicação)          │
│    Design System Limpo, Acessível, Humanizado e Dinâmico   │
│   Paleta App: Esmeralda (#059669) + Neutros Quentes (#F7F7F5)│
└──────────────────────────────┬──────────────────────────────┘
                               │
     ┌─────────────────────────┼─────────────────────────┐
     ▼                         ▼                         ▼
┌──────────────┐        ┌──────────────┐        ┌──────────────┐
│   PETSHOP    │        │    SALÃO /   │        │   SERVIÇOS   │
│ BANHO & TOSA │        │  BARBEARIA   │        │    GERAIS    │
│  (Tom Ember) │        │ (Tom Neutro) │        │(Tom Clássico)│
└──────────────┘        └──────────────┘        └──────────────┘
```

---

## 💎 2. Pilares e Personalidade da Marca

- **Humana & Acolhedora:** Uma interface clara, sem ruídos técnicos para os donos de pequenos e médios negócios.
- **Eficiente & Rápida:** Redução drástica de cliques e fricção no agendamento e atendimento.
- **Adaptável ao Nicho:** A linguagem e os fluxos se transformam dinamicamente para falar a língua do segmento (ex.: *Groomers/Pets* vs. *Profissionais/Clientes*).
- **Confiável & Segura:** Proteção estrita de dados multi-tenant, autenticação segura e estabilidade operacional.

---

## 🎨 3. Paleta de Cores e Tokens Oficiais

### 3.1. Identidade do Produto (SaaS / Aplicação Web)

Os tokens da aplicação residem em variáveis CSS nativas (`:root`), permitindo fácil manutenção e tematização:

| Token CSS | Hex / Valor | Amostra | Função / Aplicação |
|---|---|---|---|
| `--c-brand` | `#059669` | `🟢 #059669` | Cor primária: botões de ação principal, destaques e links ativos |
| `--c-brand-dark` | `#047857` | `🌲 #047857` | Hover e estado pressionado (active) de elementos primários |
| `--c-brand-light` | `#D1FAE5` | `🌱 #D1FAE5` | Fundo de badges de sucesso, focus ring e áreas de destaque suave |
| `--c-brand-subtle` | `#ECFDF5` | `🌿 #ECFDF5` | Fundo ultraleve de alertas e seleções |
| `--c-brand-text` | `#064E3B` | `🍃 #064E3B` | Cor de texto para leitura sobre `--c-brand-light` |

#### Superfícies e Neutros (Light Modern):
| Token CSS | Hex / Valor | Amostra | Função / Aplicação |
|---|---|---|---|
| `--c-bg` | `#F7F7F5` | `⚪ #F7F7F5` | Fundo geral da página (off-white acolhedor) |
| `--c-surface` | `#FFFFFF` | `⬜ #FFFFFF` | Cards, modais, popovers e gavetas laterais |
| `--c-surface-2` | `#FAFAFA` | `◽ #FAFAFA` | Fundo de inputs, tabelas e superfícies secundárias |
| `--c-border` | `#E5E4E2` | `🔘 #E5E4E2` | Bordas padrão de cards e divisores |
| `--c-border-soft` | `#F0EFEE` | `⚪ #F0EFEE` | Divisores internos e bordas secundárias sutis |

#### Tipografia e Contrastes de Texto:
| Token CSS | Hex / Valor | Função / Aplicação |
|---|---|---|
| `--c-text` | `#1A1917` | Títulos, textos principais e ênfase máxima |
| `--c-text-muted` | `#706E6B` | Subtítulos, metadados, legendas e textos de apoio |
| `--c-text-faint` | `#A6A39F` | Placeholders de formulário, ícones desabilitados e labels inativos |

---

### 3.2. Cores Semânticas e Status de Agendamento

O sistema categoriza estados do agendamento e feedbacks visuais através de pares estritos de cor e contraste:

| Status | Cor do Ícone / Borda | Fundo da Badge | Texto da Badge | Significado |
|---|---|---|---|---|
| **Pendente** | `#D97706` | `#FEF3C7` | `#92400E` | Aguardando confirmação ou pagamento |
| **Confirmado** | `#059669` | `#D1FAE5` | `#064E3B` | Horário confirmado e reservado |
| **Cancelado** | `#DC2626` | `#FEE2E2` | `#7F1D1D` | Agendamento desmarcado ou recusado |
| **Realizado** | `#A6A39F` | `#F0EFEE` | `#57534E` | Serviço concluído / entregue com sucesso |

---

### 3.3. Identidade Institucional (Nacarat SD — Landing Pages & Vitrines)

Utilizada em demonstrações comerciais (`overview.html`, folhetos e materiais publicitários):

| Token CSS | Hex / Valor | Amostra | Função / Aplicação |
|---|---|---|---|
| `--brand` | `#E8951A` | `🟠 #E8951A` | Laranja/Ouro Nacarat — CTAs comerciais, badges de destaque e métricas |
| `--brand-hover` | `#C27A13` | `🟤 #C27A13` | Hover em botões institucionais |
| `--navy-brand` | `#1E3B6A` | `🔵 #1E3B6A` | Azul Escuro Nacarat — Cabeçalhos, rodapés e títulos editoriais |
| `--navy-brand-hover` | `#152C52` | `🌌 #152C52` | Hover nos links de navegação institucional |
| `--bg-page` (Dark Demo) | `#0B0F19` | `⬛ #0B0F19` | Fundo escuro slate para contraste de alta tecnologia |
| `--bg-card` (Dark Demo) | `#151E33` | `🪟 #151E33` | Fundo dos cards na demonstração escura |

---

### 3.4. Tematização por Nicho no Onboarding

| Segmento | Cor Temática | Fundo de Ambientação | Propósito |
|---|---|---|---|
| **Petshop / Banho & Tosa** | Ember `#C8410F` | `#13100E` / `#1A1612` | Tom quente, dinâmico e focado no universo pet |
| **Salão / Barbearia** | Slate / Ouro `#D97706` | `#18181B` | Estilo sofisticado de estética e cuidados |
| **Serviços Gerais** | Azul Técnico `#2563EB` | `#0F172A` | Foco em agilidade, ordens de serviço e praticidade |

---

## 🔤 4. Tipografia

### 4.1. Famílias Tipográficas

1. **DM Sans** (Fonte Primária do SaaS):
   - *Importação:* Google Fonts (`DM+Sans:wght@300;400;500;600;700`)
   - *Uso:* Toda a interface do sistema (botões, tabelas, inputs, dashboards e navegação).
   - *Características:* Formas geométricas humanizadas, alta legibilidade em telas pequenas e densidade equilibrada.

2. **Playfair Display** (Fonte Editorial / Títulos Selecionados):
   - *Importação:* Google Fonts (`Playfair+Display:wght@600;700`)
   - *Uso:* Destaques editoriais, nomes de estabelecimentos no cabeçalho público e boas-vindas.

3. **Georgia / Serif** (Fonte de Vendas & Chamadas Institucionais):
   - *Uso:* Títulos promocionais de folheto e landing pages (ex: *"Seu negócio ainda depende só de você para funcionar?"*).

4. **Inter / System Sans-Serif**:
   - *Uso:* Gráficos rápidos, dashboards de visão geral e vitrines de simulação.

### 4.2. Escala Tipográfica Recomendada

| Nível | Tamanho | Peso | Line-Height | Uso |
|---|---|---|---|---|
| **Display / H1** | `2rem` (32px) / `2.25rem` (36px) | Bold (`700`) | `1.2` | Título principal de dashboards e telas |
| **H2 / Seção** | `1.5rem` (24px) | SemiBold (`600`) | `1.3` | Títulos de blocos, cartões e abas |
| **H3 / Subtítulo** | `1.125rem` (18px) | SemiBold (`600`) | `1.4` | Títulos de grupos de campos e cartões |
| **Body (Corpo)** | `0.875rem` (14px) / `1rem` (16px) | Regular (`400`) / Medium (`500`) | `1.5` | Textos gerais, listas e descrições |
| **Caption / Small** | `0.75rem` (12px) | Medium (`500`) / SemiBold (`600`) | `1.4` | Badges, datas, legendas e chips |

---

## 📐 5. Geometria, Espaçamento e Elevação

### 5.1. Raios de Arredondamento (Border Radius)
- **Cards e Painéis (`--r-card`):** `14px` — Proporciona um visual moderno e suave aos contornos.
- **Botões e Inputs (`--r-btn`):** `10px` — Área de toque bem delimitada e ergonômica.
- **Badges e Chips (`--r-chip`):** `999px` — Formato de pílula (pill) para status e tags rápidas.

### 5.2. Sistema de Sombras (Elevation)
```css
/* Sombra sutil para botões secundários e pequenos cards */
--shadow-subtle: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04);

/* Sombra padrão para cards e módulos de conteúdo */
--shadow-card:   0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);

/* Sombra de flutuação para modais, dropdowns e menus fixos */
--shadow-float:  0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06);
```

---

## 🧩 6. Biblioteca de Componentes Base (UI Kit)

### 6.1. Botões (`.btn`)
- **Primário (`.btn-primary`):** Fundo `--c-brand`, texto branco, sombra sutil, escala `active:scale-[0.97]`.
- **Secundário (`.btn-secondary`):** Fundo branco (`--c-surface`), borda cinza clara (`--c-border`), texto escuro.
- **Ghost (`.btn-ghost`):** Sem fundo ou borda inicial, apenas feedback de hover suave.
- **Destrutivo (`.btn-danger`):** Fundo vermelho claro (`--c-cancelled-bg`), texto vermelho escuro (`--c-cancelled-text`).

### 6.2. Campos de Formulário (`.input`)
- Fundo levemente contrastante (`--c-surface-2`), borda sólida de `1px` com `--c-border`.
- **Estado Focus:** Borda assume a cor `--c-brand` e ganha anel externo de brilho `0 0 0 3px var(--c-brand-light)`.

### 6.3. Badges de Status (`.badge`)
Formato arredondado estilo pílula com ícone indicativo e texto semi-negrito:
- `.badge-pendente` → Amarelo / Âmbar
- `.badge-confirmado` → Verde Esmeralda
- `.badge-cancelado` → Vermelho Rubi
- `.badge-realizado` → Cinza Neutro

### 6.4. Microinterações e Animações
- **Transição Padrão:** `transition-all duration-150 ease-in-out`
- **Feedback Tátil:** `active:scale-[0.97]` em botões e cards clicáveis
- **Escalonamento de Itens (`.stagger`):** Delay progressivo de `50ms` em listas carregadas.

---

## 🗣️ 7. Tom de Voz e Terminologia Adaptativa

O produto ajusta automaticamente a taxonomia e os termos conforme o nicho ativo do cliente:

| Conceito | Nicho: Petshop / Banho e Tosa | Nicho: Salão / Barbearia | Nicho: Serviços Gerais |
|---|---|---|---|
| **Prestador de Serviço** | *Groomer* / *Banhista* | *Profissional* / *Barbeiro* | *Técnico* / *Prestador* |
| **Indivíduo Atendido** | *Pet* (com Tutor) | *Cliente* | *Cliente* / *Solicitante* |
| **Cadastro Chave** | Ficha do Pet (Raça, Porte, Pelagem) | Perfil do Cliente | Cadastro de Cliente / Local |
| **Alertas Principais** | Vacinas a vencer & "Pet pronto" | Retorno de corte & Agendamentos | Manutenções & Ordens abertas |

---

## 🏛️ 8. Assinatura e Contatos Oficiais da Marca

Em rodapés institucionais, telas de suporte e peças de divulgação:
- **Localização Oficial:** Pinheiral – RJ
- **WhatsApp de Atendimento & Vendas:** `+55 (24) 99860-9210`
- **Link Direto:** `https://wa.me/5524998609210`
- **Slogans Oficiais:**
  - *"Colocamos tecnologia para trabalhar por você."*
  - *"Acelere seu negócio com automação sob medida."*
