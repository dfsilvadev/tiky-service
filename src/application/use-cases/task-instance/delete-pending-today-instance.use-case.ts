import dayjs from "dayjs";
import { type ITaskInstanceRepository } from "../../../domain/repositories/task-instance.repository";
import { InstanceStatus } from "../../../generated/prisma/client";

export interface IDeletePendingTodayInstanceDTO {
  readonly templateId: string;
  readonly playerId: string;
}

export class DeletePendingTodayInstanceUseCase {
  constructor(
    private readonly _taskInstanceRepository: ITaskInstanceRepository
  ) {}

  async execute({ templateId, playerId }: IDeletePendingTodayInstanceDTO) {
    const today = dayjs().startOf("day").toDate();

    const todayInstance =
      await this._taskInstanceRepository.findByTemplateAndDate(
        templateId,
        playerId,
        today
      );

    if (todayInstance && todayInstance.status === InstanceStatus.PENDING) {
      await this._taskInstanceRepository.delete(todayInstance.id);
    }
  }
}
