import { PrismaAccountRepository } from "../persistence/prisma/repositories/account/prisma.account.repository";

export function makeAccountRepository() {
  return new PrismaAccountRepository();
}
