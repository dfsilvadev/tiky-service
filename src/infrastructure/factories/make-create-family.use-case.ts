import { CreateFamilyUseCase } from "../../application/use-cases/family/create-family.use-case";

import { makeFamilyRepository } from "./make-family.repository";

export function makeCreateFamilyUseCase() {
  const familyRepository = makeFamilyRepository();
  return new CreateFamilyUseCase(familyRepository);
}
