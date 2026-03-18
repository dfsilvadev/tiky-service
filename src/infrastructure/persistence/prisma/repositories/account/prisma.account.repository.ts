import { prismaClient } from "../../prisma-client";

import { type ISignUpDTO } from "../../../../../application/dtos/account/sign-up.dto";
import { type IAccountRepository } from "../../../../../domain/repositories/account.repository";
import { type Account, Role } from "../../../../../generated/prisma/client";

export class PrismaAccountRepository implements IAccountRepository {
  async findById(id: string): Promise<Account | null> {
    const row = await prismaClient.account.findUnique({
      where: {
        id: id
      }
    });

    return row;
  }

  async findByEmail(email: string): Promise<Account | null> {
    const row = await prismaClient.account.findUnique({
      where: {
        email: email
      }
    });

    return row;
  }

  async create(input: ISignUpDTO): Promise<Account> {
    const row = await prismaClient.account.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash: input.password,
        role: input.role ?? Role.PLAYER,
        familyId: input.familyId
      }
    });

    return row;
  }
}
