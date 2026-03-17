import { type ISignUpDTO } from "../../../application/dtos/account/sign-up.dto";
import { type IAccountRepository } from "../../../domain/repositories/account.repository";
import { type Account } from "../../../generated/prisma/browser";

export class InMemoryAccountRepository implements IAccountRepository {
  private readonly _accounts: Account[] = [];

  async findById(_id: string): Promise<Account | null> {
    const account = this._accounts.find((account) => account.id === _id);

    return account ?? null;
  }

  async findByEmail(_email: string): Promise<Account | null> {
    const account = this._accounts.find((account) => account.email === _email);

    return account ?? null;
  }

  async create(_input: ISignUpDTO): Promise<Account> {
    const account: Account = {
      id: crypto.randomUUID(),
      name: _input.name,
      email: _input.email,
      passwordHash: _input.password,
      role: _input.role ?? "PLAYER",
      xpBalance: 0,
      currentStreak: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this._accounts.push(account);

    return account;
  }
}
