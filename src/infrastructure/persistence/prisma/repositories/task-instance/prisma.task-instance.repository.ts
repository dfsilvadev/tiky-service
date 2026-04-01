import { prismaClient } from "../../prisma-client";

import { type ITaskInstanceRepository } from "../../../../../domain/repositories/task-instance.repository";
import { type TaskInstance } from "../../../../../generated/prisma/client";

export class TaskInstanceRepository implements ITaskInstanceRepository {
  async create(input: any): Promise<TaskInstance> {
    const row = await prismaClient.taskInstance.create({
      data: { ...input }
    });

    return row;
  }

  findOneById(_id: string): Promise<TaskInstance | null> {
    throw new Error("Method not implemented.");
  }

  async findByTemplateAndDate(
    templateId: string,
    playerId: string,
    today: Date
  ): Promise<TaskInstance | null> {
    const row = await prismaClient.taskInstance.findFirst({
      where: {
        templateId,
        playerId,
        date: today
      }
    });

    return row ?? null;
  }

  findManyByPlayerId(_playerId: string): Promise<TaskInstance[]> {
    throw new Error("Method not implemented.");
  }
}
