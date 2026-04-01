import { type ITaskInstanceRepository } from "../../../domain/repositories/task-instance.repository";

import {
  InstanceStatus,
  type TaskInstance
} from "../../../generated/prisma/client";

export class InMemoryTaskInstanceRepository implements ITaskInstanceRepository {
  private taskInstances: TaskInstance[] = [];

  async create(input: any): Promise<TaskInstance> {
    const newTaskInstance: TaskInstance = {
      ...input,
      id: crypto.randomUUID(),
      status: InstanceStatus.PENDING,
      proofImageUrl: null,
      feedback: null,
      awardedXp: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.taskInstances.push(newTaskInstance);

    return newTaskInstance;
  }

  findOneById(_id: string): Promise<TaskInstance | null> {
    throw new Error("Method not implemented.");
  }

  async findByTemplateAndDate(
    templateId: string,
    playerId: string,
    today: Date
  ): Promise<TaskInstance | null> {
    const foundTaskInstance = this.taskInstances.find(
      (instance) =>
        instance.templateId === templateId &&
        instance.playerId === playerId &&
        instance.date.toDateString() === today.toDateString()
    );

    return foundTaskInstance ?? null;
  }

  findManyByPlayerId(_playerId: string): Promise<TaskInstance[]> {
    throw new Error("Method not implemented.");
  }
}
