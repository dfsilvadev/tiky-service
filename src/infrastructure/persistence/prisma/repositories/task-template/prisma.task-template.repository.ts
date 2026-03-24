import { prismaClient } from "../../prisma-client";

import {
  type ICreateTaskTemplateDTO,
  type IFindAllTaskTemplatesQueryDTO,
  type ITaskTemplateRepository,
  type IUpdateTaskTemplateDTO
} from "../../../../../domain/repositories/task-template.repository";

import {
  TemplateStatus,
  type TaskTemplate
} from "../../../../../generated/prisma/client";

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

  async update(
    id: string,
    input: IUpdateTaskTemplateDTO
  ): Promise<TaskTemplate> {
    const row = await prismaClient.taskTemplate.update({
      where: { id },
      data: input
    });

    return row;
  }

  async delete(id: string): Promise<TaskTemplate | null> {
    const row = await prismaClient.taskTemplate.update({
      where: { id },
      data: { deletedAt: new Date(), status: TemplateStatus.ARCHIVED }
    });

    return row ?? null;
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
        status: query.status,
        deletedAt: null
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
        status: query.status,
        deletedAt: null
      }
    });

    return { items: rows, total };
  }

  async findOneByIdAndFamilyId(
    id: string,
    familyId: string
  ): Promise<TaskTemplate | null> {
    const row = await prismaClient.taskTemplate.findFirst({
      where: {
        id: id,
        familyId: familyId,
        deletedAt: null
      }
    });

    return row ?? null;
  }
}
