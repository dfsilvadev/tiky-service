import dayjs from "dayjs";

import { CreateTaskInstanceUseCase } from "../../application/use-cases/task-instance/create-task-instance.use-case";

import { type ITaskInstanceRepository } from "../../domain/repositories/task-instance.repository";
import { type TaskTemplate } from "../../generated/prisma/client";

export interface ICheckAndGenerateTodayInstanceServiceDTO {
  readonly template: TaskTemplate;
  readonly playerId: string;
}

export class CheckAndGenerateTodayInstanceService {
  constructor(
    private readonly _taskInstanceRepository: ITaskInstanceRepository,
    private readonly _createTaskInstanceUseCase: CreateTaskInstanceUseCase
  ) {}

  async execute({
    template,
    playerId
  }: ICheckAndGenerateTodayInstanceServiceDTO) {
    const todayDateOnly = dayjs().startOf("day").toDate();
    let shouldGenerateToday = false;

    if (template.recurrenceType === "DAILY") {
      shouldGenerateToday = true;
    } else if (template.recurrenceType === "ONCE") {
      if (
        !template.scheduledFor ||
        dayjs(template.scheduledFor).isSame(todayDateOnly, "day")
      ) {
        shouldGenerateToday = true;
      }
    } else if (
      template.recurrenceType === "WEEKLY" &&
      template.recurrencePattern
    ) {
      const currentDayOfWeek = todayDateOnly.getDay().toString();
      if (template.recurrencePattern.includes(currentDayOfWeek)) {
        shouldGenerateToday = true;
      }
    }

    if (!shouldGenerateToday) return;

    const alreadyExists =
      await this._taskInstanceRepository.findByTemplateAndDate(
        template.id,
        playerId,
        todayDateOnly
      );
    if (alreadyExists) return;

    await this._createTaskInstanceUseCase.execute({
      templateId: template.id,
      playerId: playerId,
      date: todayDateOnly
    });
  }
}
