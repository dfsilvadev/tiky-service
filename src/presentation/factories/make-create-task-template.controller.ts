import { CreateTaskTemplateController } from "../http/controllers/task-template/create-task-template.controller";

import { makeCheckAndGenerateTodayInstanceService } from "../../infrastructure/factories/make-check-and-generate-today-instance.service";
import { makeCreateTaskTemplateUseCase } from "../../infrastructure/factories/make-create-task-template.use-case";

export function makeCreateTaskTemplateController() {
  const taskTemplateRepositoryUseCase = makeCreateTaskTemplateUseCase();
  const checkAndGenerateTodayInstanceService =
    makeCheckAndGenerateTodayInstanceService();

  return new CreateTaskTemplateController(
    taskTemplateRepositoryUseCase,
    checkAndGenerateTodayInstanceService
  );
}
