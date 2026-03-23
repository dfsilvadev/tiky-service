import { type ITaskTemplateRepository } from "../../../domain/repositories/task-template.repository";
import { type IFetchTaskTemplatesDTO } from "../../dtos/task-template/fetch-task-templates.dto";

export class FetchTaskTemplatesUseCase {
  constructor(
    private readonly _taskTemplateRepository: ITaskTemplateRepository
  ) {}

  async execute(
    familyId: string,
    { page, limit, status, order }: IFetchTaskTemplatesDTO
  ) {
    const { items, total } =
      await this._taskTemplateRepository.findManyByFamilyId(familyId, {
        page,
        limit,
        status,
        order
      });

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1
      }
    };
  }
}
