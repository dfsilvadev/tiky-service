# 🗃️ Modelagem de Dados

O projeto usa **schema Prisma modular**: ponto de entrada em `prisma/schema.prisma` e modelos em `prisma/models/*.prisma`.

## Entidades principais

| Modelo              | Descrição                                                                       |
| ------------------- | ------------------------------------------------------------------------------- |
| `Account`           | Usuário com papel (`ADMIN`/`PLAYER`), saldo de XP e streak atual                |
| `Family`            | Grupo familiar ao qual as contas pertencem; suporta soft delete via `deletedAt` |
| `Session`           | Sessão de autenticação com `refreshToken` único e controle de revogação         |
| `TaskTemplate`      | Molde da tarefa com recorrência, peso, subtarefas e status                      |
| `TaskInstance`      | Instância diária/planejada com status, prova e XP                               |
| `SubtaskInstance`   | Subtarefas de uma `TaskInstance` (tarefas `EPIC`)                               |
| `Reward`            | Item da loja com custo em XP                                                    |
| `RedemptionRequest` | Solicitação de resgate de recompensa                                            |
| `Transaction`       | Histórico financeiro de XP (ganhos, gastos, bônus e cashout)                    |

## Enums de domínio

- `Role`: `ADMIN`, `PLAYER`
- `FamilyStatus`: `ACTIVE`, `INACTIVE`
- `Weight`: `BASIC`, `IMPORTANT`, `EPIC`
- `RecurrenceType`: `ONCE`, `DAILY`, `WEEKLY`, `INTERVAL`
- `TemplateStatus`: `PENDING_APPROVAL`, `ACTIVE`, `INACTIVE`
- `InstanceStatus`: `PENDING`, `IN_REVIEW`, `COMPLETED`, `REJECTED`, `EXPIRED`
- `RedemptionStatus`: `PENDING`, `DELIVERED`
- `TransactionType`: `EARN`, `SPEND`, `BONUS`, `CASHOUT`

## Relacionamentos

```txt
Family 1:N Account
Account 1:N Session
Account 1:N TaskTemplate  (autor)
Account 1:N TaskInstance  (player)
TaskTemplate 1:N TaskInstance
TaskInstance 1:N SubtaskInstance
Account 1:N Transaction
Account 1:N RedemptionRequest
Reward 1:N RedemptionRequest
```
