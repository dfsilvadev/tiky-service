import { type IFamilyRepository } from "../../../domain/repositories/family.repository";
import { type CreateFamilyDTO } from "../../dtos/family/create-family.dto";

export class CreateFamilyUseCase {
  constructor(private readonly _familyRepository: IFamilyRepository) {}

  async execute({ name, description }: CreateFamilyDTO) {
    const family = await this._familyRepository.create({ name, description });

    return { family };
  }
}
