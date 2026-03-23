import { ResourceNotFoundError } from "../../../domain/errors/resource-not-found.error";

import { type ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";

export class GetTaskTemplateUseCase {
  constructor(
    private readonly _taskTemplateRepository: ITaskTemplateRepository
  ) {}

  async execute(id: string, familyId: string) {
    const taskTemplate =
      await this._taskTemplateRepository.findOneByIdAndFamilyId(id, familyId);

    if (!taskTemplate) throw new ResourceNotFoundError(id);

    return { taskTemplate };
  }
}
