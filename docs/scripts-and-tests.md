# 🧪 Scripts e Testes

## Scripts disponíveis

### Desenvolvimento

| Script            | Descrição                                              |
| ----------------- | ------------------------------------------------------ |
| `pnpm start:dev`  | Inicia em modo desenvolvimento com watch (`tsx watch`) |
| `pnpm build`      | Gera build CJS em `build/` via tsup                    |
| `pnpm start`      | Executa o build gerado (`node build/server.cjs`)       |
| `pnpm type:check` | Verifica tipos TypeScript sem emitir arquivos          |

### Testes

| Script               | Descrição                                       |
| -------------------- | ----------------------------------------------- |
| `pnpm test`          | Executa todas as suítes (unit + e2e)            |
| `pnpm test:dev`      | Vitest em watch mode (todas as suítes)          |
| `pnpm test:unit`     | Executa somente a suíte de testes unitários     |
| `pnpm test:unit:dev` | Suíte unitária em watch mode                    |
| `pnpm test:e2e`      | Executa somente a suíte de testes E2E           |
| `pnpm test:e2e:dev`  | Suíte E2E em watch mode                         |
| `pnpm test:coverage` | Gera relatório de cobertura (v8) em `coverage/` |
| `pnpm test:ui`       | Abre a UI interativa do Vitest                  |

### Prisma

| Script                 | Descrição                                  |
| ---------------------- | ------------------------------------------ |
| `pnpm prisma:generate` | Gera o Prisma Client a partir do schema    |
| `pnpm prisma:migrate`  | Cria e aplica migrações em desenvolvimento |
| `pnpm prisma:seed`     | Executa o seed do banco (`prisma db seed`) |
| `pnpm prisma:validate` | Valida o schema Prisma                     |
| `pnpm prisma:format`   | Formata o schema Prisma                    |
| `pnpm prisma:studio`   | Abre o Prisma Studio no browser            |

### Docker

| Script              | Descrição                          |
| ------------------- | ---------------------------------- |
| `pnpm db:up`        | Sobe apenas o container PostgreSQL |
| `pnpm db:down`      | Derruba os serviços Docker         |
| `pnpm compose:up`   | Sobe API + DB com build completo   |
| `pnpm compose:down` | Derruba toda a stack               |

### Qualidade de código

| Script              | Descrição                                 |
| ------------------- | ----------------------------------------- |
| `pnpm lint`         | Executa ESLint                            |
| `pnpm lint:fix`     | Corrige problemas de lint automaticamente |
| `pnpm format`       | Formata o código com Prettier             |
| `pnpm format:check` | Verifica formatação sem alterar arquivos  |

## Estratégia de testes

O projeto possui duas suítes no `vitest.config.mjs`.

### Unit (`unit`)

- Localização: `src/application/use-cases/**/*.{test,spec}.ts`
- Estratégia: isolamento com repositórios em memória e mocks.
- Execução: paralela.

### E2E (`e2e`)

- Localização: `src/presentation/http/controllers/**/*.{test,spec}.ts`
- Estratégia: Fastify real + PostgreSQL isolado por schema por execução.
- Execução: sequencial (`concurrent: false`).
- HTTP: `supertest`.

### Ambiente E2E

Arquivo `prisma/vitest-environment-prisma/prisma-test-environment.ts`:

```txt
beforeAll → cria schema isolado (e2e_<uuid>) + aplica migrações
afterAll  → dropa o schema + fecha conexão + restaura DATABASE_URL original
```

A variável `E2E_DATABASE_URL` pode apontar para banco separado.

### Cobertura

Gerada com `@vitest/coverage-v8`, excluindo:

- `node_modules`, `build`, `coverage`
- camada `domain` (contratos e entidades)
- DTOs, logger e código gerado (Prisma)

```bash
pnpm test:coverage
# Relatório em coverage/index.html
```
