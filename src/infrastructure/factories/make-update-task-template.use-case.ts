import { UpdateTaskTemplateUseCase } from "../../application/use-cases/task-template/update-task-template.use-case";

import { makeTaskTemplateRepository } from "./make-task-template.repository";

export function makeUpdateTaskTemplateUseCase() {
  const taskTemplateRepository = makeTaskTemplateRepository();
  return new UpdateTaskTemplateUseCase(taskTemplateRepository);
}
