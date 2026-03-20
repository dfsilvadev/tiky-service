import {
  type ICreateTaskTemplateDTO,
  type ITaskTemplateRepository
} from "../../../domain/repositories/task-template.repository";
import { type TaskTemplate } from "../../../generated/prisma/client";

export class InMemoryTaskTemplateRepository implements ITaskTemplateRepository {
  private taskTemplates: TaskTemplate[] = [];

  async create(input: ICreateTaskTemplateDTO): Promise<TaskTemplate> {
    const newTaskTemplate: TaskTemplate = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description ?? null,
      accountId: input.accountId,
      familyId: input.familyId,
      baseXp: input.baseXp,
      status: "ACTIVE",
      weight: input.weight,
      recurrenceType: input.recurrenceType,
      isMandatory: false,
      recurrencePattern: null,
      timeLimit: null,
      scheduledFor: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      subtasks: []
    };

    this.taskTemplates.push(newTaskTemplate);
    return newTaskTemplate;
  }
}
