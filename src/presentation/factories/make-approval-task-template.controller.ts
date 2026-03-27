import { ApprovalTaskTemplateController } from "../http/controllers/task-template/approval-task-template.controller";

import { makeApprovalTaskTemplateUseCase } from "../../infrastructure/factories/make-approval-task-template.use-case";

export function makeApprovalTaskTemplateController() {
  const approvalTaskTemplateUseCase = makeApprovalTaskTemplateUseCase();
  return new ApprovalTaskTemplateController(approvalTaskTemplateUseCase);
}
