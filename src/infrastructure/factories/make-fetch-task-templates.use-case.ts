import { FetchTaskTemplatesUseCase } from "../../application/use-cases/task-template/fetch-task-templates.use-case";

import { makeTaskTemplateRepository } from "./make-task-template.repository";

export function makeFetchTaskTemplatesUseCase() {
  const taskTemplatesRepository = makeTaskTemplateRepository();
  return new FetchTaskTemplatesUseCase(taskTemplatesRepository);
}
