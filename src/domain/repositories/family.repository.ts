import { type Family } from "../../generated/prisma/client";

export interface IFamilyCreateRepositoryDTO {
  readonly name: string;
  readonly description?: string;
}

export interface IFamilyUpdateRepositoryDTO extends IFamilyCreateRepositoryDTO {}

export interface IFamilyFindAllRepositoryDTO {
  readonly sort?: "asc" | "desc";
  readonly page?: number;
  readonly limit?: number;
}

export interface IFamilyRepository {
  create(_input: IFamilyCreateRepositoryDTO): Promise<Family>;
  findById(_id: string): Promise<Family | null>;
  findAll(_input: IFamilyFindAllRepositoryDTO): Promise<Family[]>;
  update(_id: string, _input: IFamilyUpdateRepositoryDTO): Promise<Family>;
  delete(_id: string): Promise<void>;
}
