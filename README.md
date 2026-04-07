# TonyPlantas

Projeto convertido para aplicação full-stack real com:

- frontend em React + Vite
- API Express
- MySQL 8+
- autenticação admin com sessões persistidas no banco
- upload real de imagens
- CRUD real de categorias e produtos

## Requisitos

- Node.js 20+
- MySQL 8+ ou MariaDB compatível

## Instalação

```bash
npm install
```

## Variáveis de ambiente

### Frontend (`.env` na raiz)

```env
VITE_API_URL=http://localhost:8000/api
```

### Backend (`backend/.env`)

Copie de `backend/.env.example` e ajuste conforme seu ambiente:

```env
PORT=8000
FRONTEND_URL=http://localhost:8080

DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=tony_plantas
DB_USER=root
DB_PASSWORD=
DB_CONNECTION_LIMIT=10

SESSION_TTL_DAYS=7
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=admin123@
```

## Banco MySQL

1. Crie o banco importando `backend/database.sql`
2. Inicie a API; no primeiro start o admin padrão é criado automaticamente

Credenciais padrão de primeiro acesso:

- email: `admin@admin.com`
- senha: `admin123@`

## Rodando localmente

API:

```bash
npm run dev:api
```

Frontend:

```bash
npm run dev
```

Ou ambos:

```bash
npm run dev:full
```

## Build

```bash
npm run build
```

## Rotas principais da API

- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
- `GET /api/categories`
- `POST /api/categories`
- `PUT /api/categories/:id`
- `DELETE /api/categories/:id`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/upload`
- `GET /api/admin/stats`

## Observações

- Os dados fake de catálogo/categorias do backend anterior foram removidos.
- O backend anterior em SQLite local foi substituído por MySQL.
- As imagens enviadas são salvas em `public/uploads`.


## Estrutura do backend

O backend foi organizado para subir no Git com separação por responsabilidade:

```text
backend/
  server.mjs
  database.sql
  .env.example
  src/
    app.mjs
    config/
    controllers/
    middlewares/
    routes/
    services/
    utils/
```

### Organização

- `config/`: ambiente, paths e conexão MySQL
- `controllers/`: camada HTTP
- `routes/`: definição das rotas da API
- `services/`: regra de negócio e persistência
- `middlewares/`: auth e tratamento de erros
- `utils/`: helpers, segurança e upload

## Deploy

### Railway

Use no serviço do backend:

- Start command: `npm run start:api`
- Root directory: raiz do projeto
- Variáveis: usar `backend/.env.example` como base

### Vercel

Configure:

```env
VITE_API_URL=https://SEU-BACKEND.up.railway.app/api
```
