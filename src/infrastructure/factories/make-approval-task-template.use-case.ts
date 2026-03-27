import { ApprovalTaskTemplateUseCase } from "../../application/use-cases/task-template/approval-task-template.use-case";

import { makeTaskTemplateRepository } from "./make-task-template.repository";

export function makeApprovalTaskTemplateUseCase() {
  const taskTemplateRepository = makeTaskTemplateRepository();
  return new ApprovalTaskTemplateUseCase(taskTemplateRepository);
}
