import { ResourceNotFoundError } from "../../../domain/errors/resource-not-found.error";

import { getXpByWeight } from "../../../shared/utils/get-xp-by-weight";

import { type ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";
import { type IUpdateTaskTemplateDTO } from "../../dtos/task-template/update-task-template.dto";

export class UpdateTaskTemplateUseCase {
  constructor(
    private readonly _taskTemplateRepository: ITaskTemplateRepository
  ) {}

  async execute(id: string, familyId: string, input: IUpdateTaskTemplateDTO) {
    const existingTemplate =
      await this._taskTemplateRepository.findOneByIdAndFamilyId(id, familyId);

    if (!existingTemplate) throw new ResourceNotFoundError(id);

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
