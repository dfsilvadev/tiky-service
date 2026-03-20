import { CreateTaskTemplateController } from "../http/controllers/task-template/create-task-template.controller";

import { makeCreateTaskTemplateUseCase } from "../../infrastructure/factories/make-create-task-template.use-case";

export function makeCreateTaskTemplateController() {
  const taskTemplateRepositoryUseCase = makeCreateTaskTemplateUseCase();
  return new CreateTaskTemplateController(taskTemplateRepositoryUseCase);
}
