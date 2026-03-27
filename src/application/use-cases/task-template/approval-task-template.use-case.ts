import { getXpByWeight } from "../../../shared/utils/get-xp-by-weight";

import { ResourceNotFoundError } from "../../../domain/errors/resource-not-found.error";

import { TemplateStatus } from "../../../generated/prisma/enums";

import { ConflictError } from "../../../domain/errors/conflict.error";

import { type ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";
import { type IApprovalTaskTemplateDTO } from "../../dtos/task-template/approval-task-template.dto";

export class ApprovalTaskTemplateUseCase {
  constructor(
    private readonly _taskTemplateRepository: ITaskTemplateRepository
  ) {}

  async execute(input: IApprovalTaskTemplateDTO) {
    const taskTemplateAlreadyExists =
      await this._taskTemplateRepository.findOneByIdAndFamilyId(
        input.templateId,
        input.familyId
      );

    if (!taskTemplateAlreadyExists)
      throw new ResourceNotFoundError(input.templateId);

    if (taskTemplateAlreadyExists.status !== TemplateStatus.PENDING_APPROVAL)
      throw new ConflictError("Task template is not pending approval");

    const baseXp = getXpByWeight(input.weight);
    const approvedTaskTemplate = await this._taskTemplateRepository.update(
      input.templateId,
      {
        weight: input.weight,
        baseXp,
        status: TemplateStatus.ACTIVE
      }
    );

    return { approvedTaskTemplate };
  }
}
