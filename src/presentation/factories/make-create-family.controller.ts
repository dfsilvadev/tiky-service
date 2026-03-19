import { CreateFamilyController } from "../http/controllers/family/create-family.controller";

import { makeCreateFamilyUseCase } from "../../infrastructure/factories/make-create-family.use-case";

export function makeCreateFamilyController() {
  const createFamilyUseCase = makeCreateFamilyUseCase();
  return new CreateFamilyController(createFamilyUseCase);
}
