import { UpdateTaskTemplateUseCase } from "../../application/use-cases/task-template/update-task-template.use-case";

import { makeAccountRepository } from "./make-account.repository";
import { makeTaskTemplateRepository } from "./make-task-template.repository";

export function makeUpdateTaskTemplateUseCase() {
  const taskTemplateRepository = makeTaskTemplateRepository();
  const accountRepository = makeAccountRepository();
  return new UpdateTaskTemplateUseCase(
    taskTemplateRepository,
    accountRepository
  );
}
