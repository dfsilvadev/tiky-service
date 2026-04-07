import { UpdateTaskTemplateController } from "../http/controllers/task-template/update-task-template.controller";

import { makeCheckAndGenerateTodayInstanceService } from "../../infrastructure/factories/make-check-and-generate-today-instance.service";
import { makeUpdateTaskTemplateUseCase } from "../../infrastructure/factories/make-update-task-template.use-case";
import { makeDeletePendingTodayInstanceUseCase } from "./make-delete-pending-today-instance.use-case";

export function makeUpdateTaskTemplateController() {
  const updateTaskTemplateUseCase = makeUpdateTaskTemplateUseCase();
  const deletePendingTodayInstanceUseCase =
    makeDeletePendingTodayInstanceUseCase();
  const checkAndGenerateTodayInstanceService =
    makeCheckAndGenerateTodayInstanceService();
  return new UpdateTaskTemplateController(
    updateTaskTemplateUseCase,
    deletePendingTodayInstanceUseCase,
    checkAndGenerateTodayInstanceService
  );
}
