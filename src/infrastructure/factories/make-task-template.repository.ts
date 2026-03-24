import { TaskTemplateRepository } from "../persistence/prisma/repositories/task-template/prisma.task-template.repository";

export function makeTaskTemplateRepository() {
  return new TaskTemplateRepository();
}
