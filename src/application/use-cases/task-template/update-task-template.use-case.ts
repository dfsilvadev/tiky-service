import { getXpByWeight } from "../../../shared/utils/get-xp-by-weight";

import { ForbiddenError } from "../../../domain/errors";
import { ResourceNotFoundError } from "../../../domain/errors/resource-not-found.error";

import { Role } from "../../../generated/prisma/client";

import { type IAccountRepository } from "../../../domain/repositories/account.repository";
import { type ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";
import { type IUpdateTaskTemplateDTO } from "../../dtos/task-template/update-task-template.dto";

export class UpdateTaskTemplateUseCase {
  constructor(
    private readonly _taskTemplateRepository: ITaskTemplateRepository,
    private readonly _accountRepository: IAccountRepository
  ) {}

  async execute(id: string, familyId: string, input: IUpdateTaskTemplateDTO) {
    const existingTemplate =
      await this._taskTemplateRepository.findOneByIdAndFamilyId(id, familyId);

    if (!existingTemplate) throw new ResourceNotFoundError(id);

    if (input.playerId && input.playerId !== existingTemplate.playerId) {
      const targetPlayer = await this._accountRepository.findById(
        input.playerId
      );

      if (
        !targetPlayer ||
        targetPlayer.familyId !== familyId ||
        targetPlayer.role !== Role.PLAYER
      )
        throw new ForbiddenError("Invalid target player for this family");
    }

    const baseXp = input.weight
      ? getXpByWeight(input.weight)
      : existingTemplate.baseXp;

    const updatedTaskTemplate = await this._taskTemplateRepository.update(id, {
      ...input,
      baseXp
    });

    return { updatedTaskTemplate };
  }
}
