import dayjs from "dayjs";

import { CreateTaskInstanceUseCase } from "../../application/use-cases/task-instance/create-task-instance.use-case";

import { type ITaskInstanceRepository } from "../../domain/repositories/task-instance.repository";
import {
  RecurrenceType,
  type TaskTemplate
} from "../../generated/prisma/client";

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
    const DAY_UNIT = "day";
    const todayDateOnly = dayjs().startOf(DAY_UNIT).toDate();
    let shouldGenerateToday = false;

    if (template.recurrenceType === RecurrenceType.DAILY) {
      shouldGenerateToday = true;
    } else if (template.recurrenceType === RecurrenceType.ONCE) {
      if (
        !template.scheduledFor ||
        dayjs(template.scheduledFor).isSame(todayDateOnly, DAY_UNIT)
      ) {
        shouldGenerateToday = true;
      }
    } else if (
      template.recurrenceType === RecurrenceType.WEEKLY &&
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
