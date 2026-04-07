import { CheckAndGenerateTodayInstanceService } from "../../application/services/check-and-generate-today-instance.service";

import { makeCreateTaskInstanceUseCase } from "./make-create-task-instance.use-case";
import { makeTaskInstanceRepository } from "./make-task-instance.repository";

export function makeCheckAndGenerateTodayInstanceService() {
  const taskInstanceRepository = makeTaskInstanceRepository();
  const createTaskInstanceUseCase = makeCreateTaskInstanceUseCase(
    taskInstanceRepository
  );

  return new CheckAndGenerateTodayInstanceService(
    taskInstanceRepository,
    createTaskInstanceUseCase
  );
}
