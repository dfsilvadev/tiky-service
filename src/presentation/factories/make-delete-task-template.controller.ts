import { DeleteTaskTemplateController } from "../http/controllers/task-template/delete-task-template.controller";

import { makeDeleteTaskTemplateUseCase } from "../../infrastructure/factories/make-delete-task-template.use-case";

export function makeDeleteTaskTemplateController() {
  const deleteTaskTemplateUseCase = makeDeleteTaskTemplateUseCase();
  return new DeleteTaskTemplateController(deleteTaskTemplateUseCase);
}
