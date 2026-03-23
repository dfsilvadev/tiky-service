import { prismaClient } from "../../prisma-client";

import {
  type ICreateTaskTemplateDTO,
  type IFindAllTaskTemplatesQueryDTO,
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

  async findManyByFamilyId(
    familyId: string,
    query: IFindAllTaskTemplatesQueryDTO
  ): Promise<{
    items: TaskTemplate[];
    total: number;
  }> {
    const rows = await prismaClient.taskTemplate.findMany({
      where: {
        familyId: familyId,
        status: query.status
      },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      orderBy: {
        createdAt: query.order
      }
    });

    const total = await prismaClient.taskTemplate.count({
      where: {
        familyId: familyId,
        status: query.status
      }
    });

    return { items: rows, total };
  }
}
