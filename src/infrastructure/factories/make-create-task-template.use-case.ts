import { CreateTaskTemplateUseCase } from "../../application/use-cases/task-template/create-task-template.use-case";

import { makeTaskTemplateRepository } from "./make-task-template.repository";

export function makeCreateTaskTemplateUseCase() {
  const taskTemplateRepository = makeTaskTemplateRepository();
  return new CreateTaskTemplateUseCase(taskTemplateRepository);
}
