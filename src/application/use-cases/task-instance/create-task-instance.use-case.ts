import { type ITaskInstanceRepository } from "../../../domain/repositories/task-instance.repository";
import { type ICreateTaskInstanceDTO } from "../../dtos/task-instance/create-task-instance.dto";

export class CreateTaskInstanceUseCase {
  constructor(
    private readonly _taskInstanceRepository: ITaskInstanceRepository
  ) {}

  async execute(input: ICreateTaskInstanceDTO) {
    const createdTaskInstance =
      await this._taskInstanceRepository.create(input);

    return { createdTaskInstance };
  }
}
