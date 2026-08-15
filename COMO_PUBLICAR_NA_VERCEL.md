# 🚀 Guia Rápido: Como Hospedar seu Painel na Vercel (100% Gratuito)

Este guia mostra como colocar seu **Painel de Estudos TCE-MA** online na Vercel com **sincronização automática na nuvem** entre todos os seus dispositivos (celular, tablet e computador).

---

## 📋 Passo a Passo para Publicação

### Passo 1: Criar um Repositório no GitHub
1. Acesse [github.com](https://github.com/) e crie um novo repositório (pode ser público ou privado, ex.: `estudos-tce-ma`).
2. Suba os arquivos desta pasta para o repositório:
   - `index.html`
   - `api/progresso.js`
   - `package.json`
   - `vercel.json`

---

### Passo 2: Conectar e Publicar na Vercel
1. Acesse [vercel.com](https://vercel.com/) e faça login com sua conta do GitHub.
2. Clique no botão **"Add New..."** ➔ **"Project"**.
3. Selecione o repositório `estudos-tce-ma` que você acabou de criar e clique em **"Deploy"**.
4. Em menos de 1 minuto, seu site estará no ar com uma URL segura (ex.: `https://estudos-tce-ma.vercel.app`).

---

### Passo 3: Ativar o Banco de Dados Gratuito (Vercel KV)
Para que os dados sincronizem automaticamente na nuvem entre todos os seus aparelhos:

1. No painel do seu projeto na Vercel, clique na aba **"Storage"** no menu superior.
2. Clique no botão **"Create Database"** e escolha **"KV (Key-Value Database)"**.
3. Dê um nome (ex: `tce-db`), selecione a região recomendada (ex: `Washington / us-east-1` ou `São Paulo / gru1`) e clique em **"Create"**.
4. Conecte o banco de dados ao seu projeto clicando em **"Connect Project"** (a Vercel criará automaticamente as variáveis de ambiente necessárias).
5. Pronto! Faça um novo deploy ou clique em **"Redeploy"** no painel da Vercel.

---

## 🔒 Como Usar a Sincronização nos seus Aparelhos

1. Abra o link da Vercel no seu **celular**, **computador** ou **tablet**.
2. No topo da página, clique no botão **"☁️ Modo Nuvem"** ou **"☁️ Conectar Nuvem"**.
3. Digite seu **PIN / Chave Pessoal** (ex: `meu-pin-1234`) e clique em **"Salvar e Sincronizar"**.
4. Faça o mesmo em todos os dispositivos que for usar.

> [!TIP]
> **Dica para o Celular:** Abra o site no Safari (iPhone) ou Chrome (Android) e selecione **"Adicionar à Tela de Início"**. O painel funcionará como um aplicativo nativo, com ícone próprio e tela cheia!
