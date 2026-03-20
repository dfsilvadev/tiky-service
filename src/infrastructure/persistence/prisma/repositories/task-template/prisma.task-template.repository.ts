import { prismaClient } from "../../prisma-client";

import {
  type ICreateTaskTemplateDTO,
  type ITaskTemplateRepository
} from "../../../../../domain/repositories/task-template.repository";
import { type TaskTemplate } from "../../../../../generated/prisma/client";

export class TaskTemplateRepository implements ITaskTemplateRepository {
  async create(input: ICreateTaskTemplateDTO): Promise<TaskTemplate> {
    const row = await prismaClient.taskTemplate.create({
      data: {
        title: input.title,
        description: input.description,
        weight: input.weight,
        baseXp: input.baseXp,
        isMandatory: input.isMandatory,
        recurrenceType: input.recurrenceType,
        recurrencePattern: input.recurrencePattern,
        scheduledFor: input.scheduledFor,
        timeLimit: input.timeLimit,
        subtasks: input.subtasks,
        accountId: input.accountId,
        familyId: input.familyId
      }
    });

    return row;
  }
}
