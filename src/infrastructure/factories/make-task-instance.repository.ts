import { TaskInstanceRepository } from "../persistence/prisma/repositories/task-instance/prisma.task-instance.repository";

export function makeTaskInstanceRepository() {
  return new TaskInstanceRepository();
}
