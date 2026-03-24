import { UpdateTaskTemplateController } from "../http/controllers/task-template/update-task-template.controller";

import { makeUpdateTaskTemplateUseCase } from "../../infrastructure/factories/make-update-task-template.use-case";

export function makeUpdateTaskTemplateController() {
  const updateTaskTemplateUseCase = makeUpdateTaskTemplateUseCase();
  return new UpdateTaskTemplateController(updateTaskTemplateUseCase);
}
