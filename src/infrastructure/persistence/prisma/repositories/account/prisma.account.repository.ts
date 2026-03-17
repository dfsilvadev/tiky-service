import { prismaClient } from "../../prisma-client";

import { type ISignUpDTO } from "../../../../../application/dtos/account/sign-up.dto";
import { type IAccountRepository } from "../../../../../domain/repositories/account.repository";
import { Role, type Account } from "../../../../../generated/prisma/client";

export class PrismaAccountRepository implements IAccountRepository {
  async findByEmail(_email: string): Promise<Account | null> {
    const row = await prismaClient.account.findUnique({
      where: {
        email: _email
      }
    });

    return row;
  }

  async create(_input: ISignUpDTO): Promise<Account> {
    const row = await prismaClient.account.create({
      data: {
        name: _input.name,
        email: _input.email,
        passwordHash: _input.password,
        role: _input.role ?? Role.PLAYER
      }
    });

    return row;
  }
}
