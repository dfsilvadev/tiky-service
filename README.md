# 🎯 Tiky Service

> API backend do **Tiky** — um gerenciador de tarefas gamificado que transforma rotinas em missões, recompensa consistência com XP e deixa a criançada engajada para valer.

---

## 📚 Sumário

1. [O Projeto](#-o-projeto)
2. [Documentação Técnica](#-documentação-técnica)
3. [Pré-requisitos](#-pré-requisitos)
4. [Configuração e Execução](#-configuração-e-execução)
5. [Licença](#-licença)

---

## 🧩 O Projeto

O Tiky opera com dois perfis distintos:

- **Admin (Responsável):** cria moldes de missões com pesos, recorrências e agendamentos; audita fotos de prova de conclusão; gerencia a loja de recompensas e controla a economia do jogo.
- **Player (Filho):** acessa um dashboard diário focado, executa missões enviando provas fotográficas, acumula XP e resgata recompensas na loja.

### Principais funcionalidades previstas (V1)

| Funcionalidade        | Descrição                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------ |
| **Motor de Missões**  | Tarefas únicas, diárias, semanais ou recorrentes a cada X dias, com suporte a agendamento futuro |
| **Prova de Trabalho** | Conclusão de tarefas atrelada ao envio obrigatório de foto (upload AWS S3)                       |
| **Economia In-App**   | Sistema financeiro transacional (ACID): ganhos, gastos, bônus e cashout de mesada                |
| **Streak**            | Ofensiva diária que recompensa consistência com marcos automáticos em 7, 14 e 21 dias            |

---

## 📎 Documentação Técnica

A documentação detalhada foi movida para a pasta `docs/`:

- [Índice da documentação](docs/README.md)
- [Status e Planejamento](docs/status-and-planning.md)
- [Stack e Arquitetura](docs/stack-and-architecture.md)
- [API e Autenticação](docs/api-and-authentication.md)
- [Modelagem de Dados](docs/data-modeling.md)
- [Scripts e Testes](docs/scripts-and-tests.md)

---

## 📋 Pré-requisitos

- Node.js 20.x (alinhado com `.nvmrc`, CI e Dockerfile)
- pnpm 10+
- Docker e Docker Compose

---

## ⚙️ Configuração e Execução

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Defina os valores obrigatórios no `.env`:

```env
DATABASE_URL='postgres://<<user>>:<<password>>@localhost:5433/<<postgres-db>>?schema=public'
POSTGRES_USER=<<user>>
POSTGRES_PASSWORD=<<password>>
POSTGRES_DB=<<postgres-db>>
POSTGRES_PORT=5433
JWT_SECRET=<<secret-minimo-32-chars>>
JWT_ISSUER=auth-jwt
ACCESS_TOKEN_TTL=86400
PASSWORD_SALT_ROUNDS=10
PORT=3000
NODE_ENV=development
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:3001,http://localhost:3002
```

### 3. Subir banco com Docker

```bash
pnpm db:up
```

### 4. Configurar Prisma

```bash
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
```

### 5. Iniciar aplicação

```bash
pnpm start:dev
```

### 6. Verificar health check

```bash
curl http://localhost:3000/api/v1/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "service": "tiky-service"
}
```

---

## 📄 Licença

MIT © 2026 [Daniel Silva](https://github.com/dfsilvadev)
