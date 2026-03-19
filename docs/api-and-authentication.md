# 🔌 API e Autenticação

Base URL: `http://localhost:3000/api/v1`

## Endpoints

### Famílias

| Método | Rota        | Descrição             | Auth |
| ------ | ----------- | --------------------- | ---- |
| `POST` | `/families` | Cria uma nova família | —    |

`POST /families` body:

```json
{
  "name": "Família Silva",
  "description": "Descrição opcional"
}
```

### Contas

| Método | Rota            | Descrição               | Auth |
| ------ | --------------- | ----------------------- | ---- |
| `POST` | `/auth/sign-up` | Cadastra uma nova conta | —    |

`POST /auth/sign-up` body:

```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "minhasenha123",
  "role": "PLAYER",
  "familyId": "uuid-da-familia"
}
```

### Autenticação

| Método | Rota                  | Descrição               | Auth                  |
| ------ | --------------------- | ----------------------- | --------------------- |
| `POST` | `/auth/sign-in`       | Autentica e gera tokens | —                     |
| `POST` | `/auth/sign-out`      | Invalida a sessão       | Cookie `refreshToken` |
| `POST` | `/auth/refresh-token` | Renova o access token   | Cookie `refreshToken` |

### Saúde

| Método | Rota      | Descrição              |
| ------ | --------- | ---------------------- |
| `GET`  | `/health` | Verifica status da API |

Resposta esperada:

```json
{
  "status": "ok",
  "service": "tiky-service"
}
```

## Fluxo de Autenticação

O sistema usa dois tokens:

| Token                     | TTL      | Armazenamento    | Uso                   |
| ------------------------- | -------- | ---------------- | --------------------- |
| **Access Token** (JWT)    | 24 horas | Body da resposta | Autorizar requisições |
| **Refresh Token** (opaco) | 7 dias   | Cookie HTTP-only | Renovar access token  |

Fluxo:

```txt
1. POST /auth/sign-up       → Cria conta com senha hasheada (bcrypt)
2. POST /auth/sign-in       → Gera JWT (24h) + refreshToken (7d)
3. Requisições protegidas   → Authorization: Bearer <access-token>
4. POST /auth/refresh-token → Cookie refreshToken válido → novo JWT
5. POST /auth/sign-out      → Revoga sessão no banco
```

## Erros Padronizados

Formato:

```json
{
  "statusCode": 400,
  "code": "VALIDATION_ERROR",
  "message": "We couldn't process your request due to invalid data..."
}
```

| Código HTTP | Code                     | Quando ocorre                       |
| ----------- | ------------------------ | ----------------------------------- |
| 400         | `VALIDATION_ERROR`       | Body com campos inválidos (Zod)     |
| 401         | `INVALID_CREDENTIALS`    | Email ou senha incorretos           |
| 401         | `INVALID_TOKEN`          | Token inválido ou expirado          |
| 401         | `UNAUTHORIZED`           | Sem autenticação ou sessão revogada |
| 403         | `FORBIDDEN`              | Sem permissão para o recurso        |
| 404         | `ACCOUNT_NOT_FOUND`      | Conta não encontrada                |
| 409         | `ACCOUNT_ALREADY_EXISTS` | Email já cadastrado                 |
| 500         | `INTERNAL_SERVER_ERROR`  | Erro interno inesperado             |
