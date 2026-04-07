import {
  type ICreateTaskInstanceRepositoryDTO,
  type ITaskInstanceRepository
} from "../../../domain/repositories/task-instance.repository";

import {
  InstanceStatus,
  SubtaskInstance,
  type TaskInstance
} from "../../../generated/prisma/client";

export class InMemoryTaskInstanceRepository implements ITaskInstanceRepository {
  private taskInstances: TaskInstance[] = [];

  async create(input: ICreateTaskInstanceRepositoryDTO): Promise<TaskInstance> {
    const newTaskInstance: TaskInstance & { subtasks?: SubtaskInstance[] } = {
      ...input,
      id: crypto.randomUUID(),
      status: InstanceStatus.PENDING,
      proofImageUrl: null,
      feedback: null,
      awardedXp: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      subtasks: []
    };

    const generatedSubtasks: SubtaskInstance[] =
      input.subtasks?.map((description: string) => ({
        id: crypto.randomUUID(),
        description,
        taskInstanceId: newTaskInstance.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: InstanceStatus.PENDING,
        proofImageUrl: null,
        rejectedReason: null,
        isDeleted: false,
        deletedAt: null
      })) || [];

    newTaskInstance.subtasks = generatedSubtasks;

    this.taskInstances.push(newTaskInstance);

    return newTaskInstance;
  }

  async delete(id: string): Promise<void> {
    const taskInstanceIndex = this.taskInstances.findIndex(
      (instance) => instance.id === id
    );

    if (taskInstanceIndex === -1) {
      throw new Error("Task instance not found");
    }

    this.taskInstances.splice(taskInstanceIndex, 1);
  }

  async findOneById(_id: string): Promise<TaskInstance | null> {
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
