import { type Account, type Role } from "../../generated/prisma/client";

export interface IAccountCreateDTO {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: Role;
}

export interface IAccountRepository {
  readonly findByEmail: (_email: string) => Promise<Account | null>;
  readonly create: (_input: IAccountCreateDTO) => Promise<Account>;
}
