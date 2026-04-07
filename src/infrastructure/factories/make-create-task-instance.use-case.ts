import { CreateTaskInstanceUseCase } from "../../application/use-cases/task-instance/create-task-instance.use-case";

import { type ITaskInstanceRepository } from "../../domain/repositories/task-instance.repository";

export function makeCreateTaskInstanceUseCase(
  taskInstanceRepository: ITaskInstanceRepository
) {
  return new CreateTaskInstanceUseCase(taskInstanceRepository);
}
