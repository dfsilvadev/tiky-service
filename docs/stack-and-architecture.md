# 🛠️ Stack e Arquitetura

## Stack Tecnológica

| Tecnologia                  | Versão | Uso                     |
| --------------------------- | ------ | ----------------------- |
| **Node.js**                 | 20.x   | Runtime                 |
| **TypeScript**              | 5.9.x  | Tipagem estática        |
| **Fastify**                 | 5.8.x  | Framework HTTP          |
| **@fastify/jwt**            | 10.x   | Autenticação JWT        |
| **@fastify/cookie**         | 11.x   | Cookies HTTP-only       |
| **@fastify/cors**           | 11.x   | CORS                    |
| **PostgreSQL**              | 16     | Banco de dados          |
| **Prisma**                  | 7.4.x  | ORM + migrações         |
| **@prisma/adapter-pg**      | 7.4.x  | Adaptador de conexão PG |
| **Zod**                     | 4.x    | Validação de schemas    |
| **bcryptjs**                | 3.x    | Hash de senhas          |
| **dayjs**                   | 1.11.x | Manipulação de datas    |
| **Vitest**                  | 4.x    | Testes unitários e E2E  |
| **supertest**               | 7.x    | Testes HTTP             |
| **Docker + Docker Compose** | —      | Containerização         |
| **pnpm**                    | 10+    | Gerenciador de pacotes  |

## Arquitetura

O projeto segue **Clean Architecture** com **SOLID**, isolando regras de negócio de framework, banco e protocolo HTTP.

### Regra de dependência

```
Request HTTP
  → Presentation  (rotas, controllers, middlewares, validators)
  → Application   (use-cases, DTOs)
  → Domain        (entidades, contratos, erros)
  → Infrastructure (Prisma, bcrypt, JWT)
  → Response HTTP
```

Camadas internas nunca conhecem detalhes de camadas externas.

### Camadas

| Camada             | Localização           | Responsabilidade                                                                                |
| ------------------ | --------------------- | ----------------------------------------------------------------------------------------------- |
| **Domain**         | `src/domain/`         | Entidades, contratos de repositório/serviço e erros de domínio. Sem dependências de tecnologia. |
| **Application**    | `src/application/`    | Orquestração de casos de uso. Não conhece HTTP, Prisma nem Docker.                              |
| **Infrastructure** | `src/infrastructure/` | Implementações concretas: Prisma, bcrypt, JWT e logger.                                         |
| **Presentation**   | `src/presentation/`   | Rotas, controllers, middlewares, Zod validators e bootstrap do servidor.                        |
| **Shared**         | `src/shared/`         | Configuração de ambiente, constantes, mocks e utilitários transversais.                         |

### Estrutura de diretórios

```
src/
├── server.ts
├── @types/
├── application/
│   ├── dtos/
│   └── use-cases/
├── domain/
│   ├── entities/
│   ├── errors/
│   ├── repositories/
│   └── services/
├── generated/
│   └── prisma/
├── infrastructure/
│   ├── factories/
│   ├── logger/
│   ├── persistence/
│   └── security/
├── presentation/
│   ├── factories/
│   ├── http/
│   └── server/
└── shared/
    ├── config/env/
    ├── constants/
    ├── mocks/
    └── utils/
```

### Injeção de dependências

Toda composição é feita via **factories** explícitas, sem container IoC:

```txt
make-sign-in.use-case.ts
  → makeAccountRepository()    → PrismaAccountRepository
  → makePasswordHasher()       → BcryptEncryptionService
  → makeTokenService(app)      → FastifyTokenService
  → makeSessionRepository()    → PrismaSessionRepository
```
