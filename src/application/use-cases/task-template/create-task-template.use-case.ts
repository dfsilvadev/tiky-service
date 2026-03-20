import { ECONOMY_RULES } from "../../../domain/constants/economy.constants";

import { type ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";
import { type ICreateTaskTemplateDTO } from "../../dtos/task-template/create-task-template.dto";

export class CreateTaskTemplateUseCase {
  constructor(
    private readonly _taskTemplateRepository: ITaskTemplateRepository
  ) {}

  async execute(data: ICreateTaskTemplateDTO) {
    const calculatedXp = ECONOMY_RULES.TASK_WEIGHT_XP[data.weight];

    const createdTaskTemplate = await this._taskTemplateRepository.create({
      ...data,
      baseXp: calculatedXp
    });

    return { taskTemplate: createdTaskTemplate };
  }
}
