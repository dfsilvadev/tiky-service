import { GetTaskTemplateUseCase } from "../../application/use-cases/task-template/get-task-template.use-case";

import { makeTaskTemplateRepository } from "./make-task-template.repository";

export function makeGetTaskTemplateUseCase() {
  const taskTemplateRepository = makeTaskTemplateRepository();
  return new GetTaskTemplateUseCase(taskTemplateRepository);
}
