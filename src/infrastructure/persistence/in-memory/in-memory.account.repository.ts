import { type ISignUpDTO } from "../../../application/dtos/account/sign-up.dto";
import { type IAccountRepository } from "../../../domain/repositories/account.repository";
import { type Account } from "../../../generated/prisma/client";

export class InMemoryAccountRepository implements IAccountRepository {
  private readonly _accounts: Account[] = [];

  async findById(id: string): Promise<Account | null> {
    const account = this._accounts.find((account) => account.id === id);

    return account ?? null;
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = this._accounts.find((account) => account.email === email);

    return account ?? null;
  }

  async create(input: ISignUpDTO): Promise<Account> {
    const account: Account = {
      id: crypto.randomUUID(),
      name: input.name,
      email: input.email,
      passwordHash: input.password,
      familyId: crypto.randomUUID(),
      role: input.role ?? "PLAYER",
      xpBalance: 0,
      currentStreak: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this._accounts.push(account);

    return account;
  }
}
