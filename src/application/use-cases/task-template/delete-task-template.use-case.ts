import { ResourceNotFoundError } from "../../../domain/errors/resource-not-found.error";

import { type ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";
import { type IDeleteTaskTemplateDTO } from "../../dtos/task-template/delete-task-template.dto";

export class DeleteTaskTemplateUseCase {
  constructor(
    private readonly _taskTemplateRepository: ITaskTemplateRepository
  ) {}

  async execute({ id, familyId }: IDeleteTaskTemplateDTO) {
    const existingTemplate =
      await this._taskTemplateRepository.findOneByIdAndFamilyId(id, familyId);

    if (!existingTemplate) throw new ResourceNotFoundError(id);

    const deletedTaskTemplate = await this._taskTemplateRepository.delete(
      existingTemplate.id
    );

    return deletedTaskTemplate;
  }
}
