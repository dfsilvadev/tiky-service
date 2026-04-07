import { prismaClient } from "../../prisma-client";

import {
  type ICreateTaskInstanceDTO,
  type ITaskInstanceRepository
} from "../../../../../domain/repositories/task-instance.repository";
import {
  InstanceStatus,
  type TaskInstance
} from "../../../../../generated/prisma/client";

export class TaskInstanceRepository implements ITaskInstanceRepository {
  async create(input: ICreateTaskInstanceDTO): Promise<TaskInstance> {
    const row = await prismaClient.taskInstance.create({
      data: {
        templateId: input.templateId,
        playerId: input.playerId,
        date: input.date,
        ...(input.subtasks &&
          input.subtasks.length > 0 && {
            subtasks: {
              create: input.subtasks.map((description) => ({
                description,
                status: InstanceStatus.PENDING
              }))
            }
          })
      },
      include: {
        subtasks: true
      }
    });

    return row;
  }

  async delete(id: string): Promise<void> {
    await prismaClient.taskInstance.delete({
      where: {
        id
      }
    });
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
