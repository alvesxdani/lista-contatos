# Lista de Contatos

Aplicacao web para gerenciamento de contatos pessoais, com autenticacao de usuarios e operacoes CRUD completas.

## Tecnologias

- **Next.js 16** (App Router) — framework React fullstack
- **React 19** — interface de usuario
- **TypeScript** — tipagem estatica
- **Firebase** — autenticacao (Auth) e banco de dados (Firestore)
- **Tailwind CSS 4** — estilizacao
- **Radix UI** — componentes acessiveis (Dialog, Table, Button, etc.)
- **Lucide React** — icones

## Funcionalidades

- Registro e login de usuarios com email/senha
- Rotas protegidas com verificacao de autenticacao via cookies
- Listagem de contatos do usuario autenticado
- Criacao, edicao e exclusao de contatos (nome, email, telefone)
- Busca/filtragem de contatos em tempo real
- Confirmacao antes de excluir um contato

## Estrutura do Projeto

```
app/
  login/              # Pagina e formulario de login
  register/           # Pagina e formulario de registro
  (protected)/        # Rotas protegidas (requerem autenticacao)
    page.tsx          # Pagina principal — lista de contatos
    contact-list.tsx  # Componente da lista de contatos
    layout.tsx        # Layout com verificacao de auth e header
  api/
    auth/
      login/          # POST — login com Firebase Auth
      register/       # POST — registro de novo usuario
      logout/         # Logout (limpa cookies)
    contacts/
      route.ts        # GET (listar) e POST (criar) contatos
      [id]/route.ts   # PUT (editar) e DELETE (excluir) contato
    services/
      firebase.ts     # Configuracao do Firebase (Auth + Firestore)
components/
  header.tsx          # Header com nome do usuario
  ui/                 # Componentes reutilizaveis (Button, Input, Dialog, Table, etc.)
```

## Pre-requisitos

- Node.js 18+
- Projeto Firebase com Authentication e Firestore habilitados

## Configuracao

1. Clone o repositorio:

```bash
git clone https://github.com/alvesxdani/lista-contatos
cd lista-contatos
```

2. Instale as dependencias:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as credenciais do Firebase.

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Acesse [http://localhost:3000](http://localhost:3000) no navegador.
