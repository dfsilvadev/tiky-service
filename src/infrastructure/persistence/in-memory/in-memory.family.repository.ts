import {
  type IFamilyCreateDTO,
  type IFamilyFindAllDTO,
  type IFamilyRepository,
  type IFamilyUpdateDTO
} from "../../../domain/repositories/family.repository";
import { type Family } from "../../../generated/prisma/client";

export class InMemoryFamilyRepository implements IFamilyRepository {
  private family: Family[] = [];

  async create(input: IFamilyCreateDTO): Promise<Family> {
    const newFamily: Family = {
      id: crypto.randomUUID(),
      name: input.name,
      description: input.description ?? "",
      status: "ACTIVE",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    };

    this.family.push(newFamily);
    return newFamily;
  }

  async findById(id: string): Promise<Family | null> {
    const family = this.family.find((f) => f.id === id);
    return family ?? null;
  }

  async findAll({
    sort = "asc",
    page = 1,
    limit = 20
  }: IFamilyFindAllDTO): Promise<Family[]> {
    const sortedFamily = [...this.family].sort((a, b) => {
      if (sort === "asc") {
        return a.createdAt.getTime() - b.createdAt.getTime();
      } else {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

    const startIndex = (page - 1) * limit;
    const paginatedFamily = sortedFamily.slice(startIndex, startIndex + limit);

    return paginatedFamily.filter((f) => f.status === "ACTIVE");
  }

  update(id: string, input: IFamilyUpdateDTO): Promise<Family> {
    const familyIndex = this.family.findIndex((f) => f.id === id);

    if (familyIndex === -1) throw new Error("Family not found");

    const updatedFamily: Family = {
      ...this.family[familyIndex],
      name: input.name,
      description: input.description ?? this.family[familyIndex].description,
      updatedAt: new Date()
    };

    this.family[familyIndex] = updatedFamily;
    return Promise.resolve(updatedFamily);
  }

  delete(id: string): Promise<void> {
    const familyIndex = this.family.findIndex((f) => f.id === id);

    if (familyIndex === -1) throw new Error("Family not found");

    this.family[familyIndex].status = "DELETED";
    this.family[familyIndex].deletedAt = new Date();

    return Promise.resolve();
  }
}
