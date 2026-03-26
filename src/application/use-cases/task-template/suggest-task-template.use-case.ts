import { getXpByWeight } from "../../../shared/utils/get-xp-by-weight";

import {
  RecurrenceType,
  TemplateStatus,
  Weight
} from "../../../generated/prisma/client";

import { type ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";
import { type ISuggestTaskTemplateDTO } from "../../dtos/task-template/suggest-task-template.dto";

export class SuggestTaskTemplateUseCase {
  constructor(
    private readonly _taskTemplateRepository: ITaskTemplateRepository
  ) {}

  async execute(input: ISuggestTaskTemplateDTO) {
    const baseXp = getXpByWeight(Weight.SUGGESTED);

    const suggestedTaskTemplate = await this._taskTemplateRepository.create({
      ...input,
      baseXp,
      status: TemplateStatus.PENDING_APPROVAL,
      weight: Weight.SUGGESTED,
      recurrenceType: RecurrenceType.ONCE,
      isMandatory: false,
      subtasks: []
    });

    return { suggestedTaskTemplate };
  }
}
