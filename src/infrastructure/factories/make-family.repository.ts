import { PrismaFamilyRepository } from "../persistence/prisma/repositories/family/prisma.family.repository";

export function makeFamilyRepository() {
  return new PrismaFamilyRepository();
}
