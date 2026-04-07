# Implementation Notes

## Backend reorganizado para Git/deploy

O backend foi refatorado de um único arquivo para uma estrutura modular pronta para versionamento e manutenção.

### Nova estrutura

- `backend/server.mjs` - bootstrap do servidor
- `backend/src/app.mjs` - instanciação do Express
- `backend/src/config` - env, paths, MySQL
- `backend/src/controllers` - handlers HTTP
- `backend/src/routes` - rotas da API
- `backend/src/services` - regras de negócio
- `backend/src/middlewares` - auth e error handler
- `backend/src/utils` - helpers, segurança e upload

### Mantido funcionalmente

- MySQL real
- admin auth com sessão persistida
- CRUD de categorias
- CRUD de produtos
- upload de imagens
- dashboard stats
- seed automático do primeiro admin

### Melhorias adicionais

- CORS com múltiplas origens via `FRONTEND_URL` separado por vírgula
- entrypoint mais limpo para Railway
- separação completa por camadas para subir no Git
