# tiky-service

tiky-service

### 📁 Estrutura do Projeto

```
src/
├── domain/                          # 🟢 CAMADA DE DOMÍNIO (Núcleo)
│   ├── entities/                    # Entidades de domínio
│   │   ├──
│   ├── repositories/                # Interfaces de repositórios
│   │   └──
│   ├── services/                    # Interfaces de serviços de domínio
│   │   ├──
│   └── errors/                      # Erros de domínio
│       ├──
│
├── application/                      # 🟡 CAMADA DE APLICAÇÃO
│   ├── use-cases/                    # Casos de uso (orquestração)
│   │   ├──
│   └── dtos/                         # Data Transfer Objects
│       ├──
│
├── infrastructure/                   # 🔴 CAMADA DE INFRAESTRUTURA
│   ├── persistence/                  # Implementações de persistência
│   │   └── prisma/
│   │       ├── repositories/
│   │       │   └──
│   │       └── prisma-client.ts
│   ├── security/                     # Implementações de segurança
│   │   ├──
│   ├── logger/                      # Sistema de logging
│   │   ├── console-logger.ts
│   │   └── logger.interface.ts
│   └── factories/                    # Factories para injeção de dependências
│       ├──
│
├── presentation/                     # 🔵 CAMADA DE APRESENTAÇÃO
│   ├── http/                        # HTTP (Express)
│   │   ├── controllers/             # Controllers
│   │   │   ├──
│   │   ├── middlewares/             # Middlewares HTTP
│   │   │   └──
│   │   ├── routes/                  # Rotas
│   │   │   ├──
│   │   │   └── index.ts
│   │   ├── validators/              # Validação de entrada (Zod)
│   │   │   ├──
│   │   ├── errors/                   # Erros HTTP
│   │   │   ├──
│   │   │   └── constants/
│   │   ├── adapters/                # Adaptadores Fastify(?)
│   │   │   ├──
│   │   └── types/                   # Tipos HTTP
│   │       └──
│   ├── server/                      # Configuração do servidor
│   │   ├── app.ts                   # Express app setup
│   │   ├── server.ts                # Server startup
│   │   └── config/                  # Config HTTP
│   │       ├── cors.config.ts
│   │       └── env/
│   └── factories/                   # Factories de controllers/middlewares
│       ├──
│
├── shared/                          # 🟣 COMPARTILHADO
    └── types/                       # Tipos compartilhados
        └──
```
