import { type Account, type Role } from "../../generated/prisma/client";

export interface IAccountCreateDTO {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: Role;
  readonly familyId: string;
}

export interface IAccountRepository {
  findById(_id: string): Promise<Account | null>;
  findByEmail(_email: string): Promise<Account | null>;
  create(_input: IAccountCreateDTO): Promise<Account>;
}
