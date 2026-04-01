import { CreateTaskInstanceUseCase } from "../../application/use-cases/task-instance/create-task-instance.use-case";

import { makeTaskInstanceRepository } from "./make-task-instance.repository";

export function makeCreateTaskInstanceUseCase() {
  const taskInstanceRepository = makeTaskInstanceRepository();
  return new CreateTaskInstanceUseCase(taskInstanceRepository);
}
