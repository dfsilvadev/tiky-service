import { GetTaskTemplateController } from "../http/controllers/task-template/get-task-template.controller";

import { makeGetTaskTemplateUseCase } from "../../infrastructure/factories/make-get-task-template.use-case";

export function makeGetTaskTemplateController() {
  const getTaskTemplateUseCase = makeGetTaskTemplateUseCase();
  return new GetTaskTemplateController(getTaskTemplateUseCase);
}
