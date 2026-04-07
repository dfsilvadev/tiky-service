import { DeletePendingTodayInstanceUseCase } from "../../application/use-cases/task-instance/delete-pending-today-instance.use-case";

import { makeTaskInstanceRepository } from "../../infrastructure/factories/make-task-instance.repository";

export function makeDeletePendingTodayInstanceUseCase() {
  const taskInstanceRepository = makeTaskInstanceRepository();
  return new DeletePendingTodayInstanceUseCase(taskInstanceRepository);
}
