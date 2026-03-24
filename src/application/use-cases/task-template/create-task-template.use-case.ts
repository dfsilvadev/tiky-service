import { getXpByWeight } from "../../../shared/utils/get-xp-by-weight";

import { type ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";
import { type ICreateTaskTemplateDTO } from "../../dtos/task-template/create-task-template.dto";

export class CreateTaskTemplateUseCase {
  constructor(
    private readonly _taskTemplateRepository: ITaskTemplateRepository
  ) {}

  async execute(data: ICreateTaskTemplateDTO) {
    const calculatedXp = getXpByWeight(data.weight);

    const createdTaskTemplate = await this._taskTemplateRepository.create({
      ...data,
      baseXp: calculatedXp
    });

    return { createdTaskTemplate };
  }
}
