import { CreateTaskTemplateUseCase } from "../../application/use-cases/task-template/create-task-template.use-case";
import { makeAccountRepository } from "./make-account.repository";

import { makeTaskTemplateRepository } from "./make-task-template.repository";

export function makeCreateTaskTemplateUseCase() {
  const taskTemplateRepository = makeTaskTemplateRepository();
  const accountRepository = makeAccountRepository();
  return new CreateTaskTemplateUseCase(
    taskTemplateRepository,
    accountRepository
  );
}
