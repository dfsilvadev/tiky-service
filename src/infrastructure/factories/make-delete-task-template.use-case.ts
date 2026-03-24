import { DeleteTaskTemplateUseCase } from "../../application/use-cases/task-template/delete-task-template.use-case";

import { makeTaskTemplateRepository } from "./make-task-template.repository";

export function makeDeleteTaskTemplateUseCase() {
  const taskTemplateRepository = makeTaskTemplateRepository();
  return new DeleteTaskTemplateUseCase(taskTemplateRepository);
}
