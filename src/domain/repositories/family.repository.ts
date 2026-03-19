import { type Family } from "../../generated/prisma/client";

export interface IFamilyCreateDTO {
  readonly name: string;
  readonly description?: string;
}

export interface IFamilyUpdateDTO extends IFamilyCreateDTO {}

export interface IFamilyFindAllDTO {
  readonly sort?: "asc" | "desc";
  readonly page?: number;
  readonly limit?: number;
}

export interface IFamilyRepository {
  create(_input: IFamilyCreateDTO): Promise<Family>;
  findById(_id: string): Promise<Family | null>;
  findAll(_input: IFamilyFindAllDTO): Promise<Family[]>;
  update(_id: string, _input: IFamilyUpdateDTO): Promise<Family>;
  delete(_id: string): Promise<void>;
}
