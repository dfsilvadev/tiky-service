import { FetchTaskTemplatesController } from "../http/controllers/task-template/fetch-task-templates.controller";

import { makeFetchTaskTemplatesUseCase } from "../../infrastructure/factories/make-fetch-task-templates.use-case";

export function makeFetchTaskTemplatesController() {
  const taskTemplateRepositoryUseCase = makeFetchTaskTemplatesUseCase();
  return new FetchTaskTemplatesController(taskTemplateRepositoryUseCase);
}
