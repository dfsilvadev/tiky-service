import { prismaClient } from "../../prisma-client";

import {
  type IFamilyCreateRepositoryDTO,
  type IFamilyFindAllRepositoryDTO,
  type IFamilyRepository,
  type IFamilyUpdateRepositoryDTO
} from "../../../../../domain/repositories/family.repository";
import { type Family } from "../../../../../generated/prisma/client";

export class PrismaFamilyRepository implements IFamilyRepository {
  async create(input: IFamilyCreateRepositoryDTO): Promise<Family> {
    const row = await prismaClient.family.create({
      data: {
        name: input.name,
        description: input.description
      }
    });

    return row;
  }

  async findById(id: string): Promise<Family | null> {
    const row = await prismaClient.family.findUnique({
      where: { id }
    });

    return row ?? null;
  }

  async findAll({
    sort = "asc",
    page = 1,
    limit = 20
  }: IFamilyFindAllRepositoryDTO): Promise<Family[]> {
    const rows = await prismaClient.family.findMany({
      where: { deletedAt: null, status: "ACTIVE" },
      orderBy: { createdAt: sort },
      skip: (page - 1) * limit,
      take: limit
    });

    return rows;
  }

  async update(id: string, input: IFamilyUpdateRepositoryDTO): Promise<Family> {
    const row = await prismaClient.family.update({
      where: { id },
      data: {
        name: input.name,
        description: input.description
      }
    });

    return row;
  }

  async delete(id: string): Promise<void> {
    await prismaClient.family.update({
      where: { id },
      data: { deletedAt: new Date(), status: "DELETED" }
    });
  }
}
