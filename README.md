# 🎯 Tiky - Gamified Task Manager

O **Tiky** é uma aplicação full-stack gamificada de gestão de tarefas, desenhada para transformar a rotina e as responsabilidades de uma criança de 10 anos em uma experiência divertida e engajadora.

Em vez de simples listas de afazeres, o Tiky transforma tarefas domésticas, estudos e rotinas em "Missões" que geram pontos de experiência (XP), constroem ofensivas (Streaks) e permitem o resgate de recompensas do mundo real em uma loja in-app.

## ✨ O Conceito

O sistema opera com dois perfis distintos:

- **Admin (Responsável):** Cria os moldes das missões (com pesos, recorrências e agendamentos), audita as fotos enviadas como prova de conclusão, gerencia a loja de recompensas e controla a economia do jogo (bônus e saques).
- **Player (Filho):** Acessa um dashboard diário focado, executa as missões enviando provas fotográficas, acumula XP e gasta seus pontos na loja do aplicativo.

## 🚀 Principais Funcionalidades (V1)

- **Motor de Recorrência e Agendamento:** Tarefas podem ser únicas, diárias, semanais ou a cada X dias, com suporte a agendamento futuro.
- **Prova de Trabalho (S3):** Conclusão de tarefas atrelada ao envio obrigatório de fotos (upload para AWS S3).
- **Economia e Loja In-App:** Sistema financeiro transacional (ACID) para gerenciar ganhos, gastos, bônus surpresa e "Cashout" (saque de mesada).
- **Gamificação (Streak):** Sistema de ofensiva diária que recompensa a consistência nas tarefas obrigatórias com marcos automáticos (7, 14, 21 dias).

## 🚀 Stack Tecnológica

- **Node.js** + **TypeScript**
- **Fastify**
- **PostgreSQL**
- **Prisma** + **Prisma Adapter PG**
- **Docker** + **Docker Compose**
- **Zod**
- **Vitest**
- **pnpm**

## 📋 Pré-requisitos

- Node.js 20+
- pnpm 10+
- Docker e Docker Compose

## 🛠️ Configuração Inicial

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Preencha o `.env` com os valores do ambiente local:

```env
# DATABASE
DATABASE_URL='postgres://<<user>>:<<password>>@localhost:5433/<<postgres-db>>?schema=public'
E2E_DATABASE_URL='postgres://<<user>>:<<password>>@localhost:5434/<<postgres-db>>?schema=public'

# POSTGRESQL (DOCKER)
POSTGRES_USER=<<user>>
POSTGRES_PASSWORD=<<password>>
POSTGRES_DB=<<postgres-db>>
POSTGRES_PORT=5433

# JWT CONFIGURATION
JWT_SECRET=<<secret>>

# FASTIFY PORT
PORT=3000

# ENV ENVIRONMENT
NODE_ENV=development

# CORS
CORS_ORIGINS=

```

### 3. Subir banco com Docker (desenvolvimento)

```bash
pnpm db:up
```

### 4. Configurar Prisma

```bash
pnpm prisma:generate
pnpm prisma:migrate
```

### 5. Iniciar aplicação

```bash
pnpm start:dev
```

## 🩺 Rodar e Validar Health Check

Com a API em execução, verifique o endpoint:

```txt
GET /api/v1/health
```

Exemplo:

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

## 📜 Scripts Disponíveis

### Desenvolvimento

- `pnpm start:dev` - Inicia em modo desenvolvimento com watch.
- `pnpm build` - Gera build em `build/`.
- `pnpm start` - Executa build gerado.
- `pnpm type:check` - Verifica tipos TypeScript.

### Testes

- `pnpm test` - Executa todas as suítes.
- `pnpm test:dev` - Executa Vitest em watch mode.
- `pnpm test:unit` - Executa suíte unit.
- `pnpm test:e2e` - Executa suíte e2e.
- `pnpm test:coverage` - Gera cobertura de testes.
- `pnpm test:ui` - Abre UI do Vitest.

### Prisma

- `pnpm prisma:generate` - Gera Prisma Client.
- `pnpm prisma:migrate` - Cria/aplica migrações em desenvolvimento.
- `pnpm prisma:validate` - Valida schema Prisma.
- `pnpm prisma:format` - Formata schema Prisma.
- `pnpm prisma:studio` - Abre Prisma Studio.

### Docker

- `pnpm db:up` - Sobe apenas PostgreSQL.
- `pnpm db:down` - Derruba serviços Docker.
- `pnpm compose:up` - Sobe API + DB com build.
- `pnpm compose:down` - Derruba stack completa.

### Qualidade de Código

- `pnpm lint` - Executa ESLint.
- `pnpm lint:fix` - Corrige problemas de lint.
- `pnpm format` - Formata com Prettier.
- `pnpm format:check` - Verifica formatação.

## 🏗️ Arquitetura

Este projeto segue princípios de **Clean Architecture** e **SOLID**, com foco em isolamento da regra de negócio e baixo acoplamento entre framework, banco e casos de uso.

### Visão Geral

Regra principal de dependência: camadas externas podem depender de camadas internas, mas camadas internas não conhecem detalhes externos.

Em termos práticos:

- `presentation` conhece `application`.
- `application` conhece `domain`.
- `infrastructure` implementa contratos definidos no `domain`.
- `domain` não depende de nada do framework, banco ou HTTP.

### Camadas e Responsabilidades

1. **Domain (`src/domain`)**
   Responsabilidade: núcleo do negócio.
   Contém entidades, contratos de repositório/serviço e erros de domínio.
   Objetivo: manter regras invariantes e linguagem de negócio independentes de tecnologia.

2. **Application (`src/application`)**
   Responsabilidade: orquestração de casos de uso.
   Contém `use-cases` e `dtos` para entrada/saída da aplicação.
   Objetivo: executar fluxos de negócio sem conhecer HTTP, Prisma, Fastify ou Docker.

3. **Infrastructure (`src/infrastructure`)**
   Responsabilidade: detalhes técnicos e integrações.
   Contém implementações concretas de persistência, segurança e logging.
   Objetivo: permitir troca de tecnologia sem alterar regras de negócio.

4. **Presentation (`src/presentation`)**
   Responsabilidade: entrada e saída da API.
   Contém rotas, controllers, middlewares, adapters, validação e bootstrap do servidor.
   Objetivo: traduzir protocolo HTTP para casos de uso e devolver respostas padronizadas.

5. **Shared (`src/shared`)**
   Responsabilidade: tipos e utilidades transversais reutilizáveis.

6. **Generated (`src/generated`)**
   Responsabilidade: artefatos gerados (Prisma Client).
   Observação: código gerado não deve ser usado para concentrar regra de negócio manual.

### Estrutura Resumida (estado atual)

```txt
src/
├── application/
│   ├── dtos/
│   └── use-cases/
├── domain/
│   ├── entities/
│   ├── errors/
│   │   ├── constants/
│   │   └── utils/
│   ├── repositories/
│   └── services/
├── generated/
│   └── prisma/
├── infrastructure/
│   ├── factoreis/
│   ├── logger/
│   ├── persistence/
│   │   └── prisma/
│   │       └── repositories/
│   └── security/
├── presentation/
│   ├── factories/
│   ├── http/
│   │   ├── adapters/
│   │   ├── controllers/
│   │   ├── erros/
│   │   │   └── constants/
│   │   ├── middlewares/
│   │   │   └── dtos/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   │   └── constants/
│   │   └── validators/
│   └── server/
│       └── config/
│           └── env/
└── shared/
```

### Princípios Aplicados

**Clean Architecture**

- `domain` é independente de framework e banco.
- `application` depende de abstrações do domínio.
- `infrastructure` implementa portas/contratos.
- `presentation` adapta HTTP para casos de uso.

**SOLID**

- **S**ingle Responsibility: cada módulo deve ter um foco único.
- **O**pen/Closed: extensão via novos casos de uso/implementações sem quebrar contratos.
- **L**iskov Substitution: implementações de contratos devem ser substituíveis.
- **I**nterface Segregation: contratos pequenos e específicos por contexto.
- **D**ependency Inversion: regras de negócio dependem de abstrações, não de detalhes.

### Fluxo de Dados (alto nível)

```txt
Request HTTP
   -> Presentation (routes/controllers/middlewares)
   -> Application (use-cases)
   -> Domain (regras e contratos)
   -> Infrastructure (Prisma/serviços externos)
   -> Response HTTP
```
