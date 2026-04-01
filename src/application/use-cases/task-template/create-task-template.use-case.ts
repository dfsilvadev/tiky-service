import { getXpByWeight } from "../../../shared/utils/get-xp-by-weight";

import { ForbiddenError } from "../../../domain/errors";
import { ConflictError } from "../../../domain/errors/conflict.error";
import { ResourceNotFoundError } from "../../../domain/errors/resource-not-found.error";

import { Role } from "../../../generated/prisma/client";

import { type IAccountRepository } from "../../../domain/repositories/account.repository";
import { type ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";
import { type ICreateTaskTemplateDTO } from "../../dtos/task-template/create-task-template.dto";

export class CreateTaskTemplateUseCase {
  constructor(
    private readonly _taskTemplateRepository: ITaskTemplateRepository,
    private readonly _accountRepository: IAccountRepository
  ) {}

  async execute(input: ICreateTaskTemplateDTO) {
    const calculatedXp = getXpByWeight(input.weight);

    const targetPlayer = await this._accountRepository.findById(input.playerId);

    if (!targetPlayer) throw new ResourceNotFoundError(input.playerId);

    if (targetPlayer.role !== Role.PLAYER)
      throw new ConflictError("Tasks can only be assigned to PLAYER accounts");

    if (targetPlayer.familyId !== input.familyId)
      throw new ForbiddenError(
        "You cannot assign tasks to players outside of your family"
      );

    const createdTaskTemplate = await this._taskTemplateRepository.create({
      ...input,
      baseXp: calculatedXp
    });

    return { createdTaskTemplate };
  }
}
