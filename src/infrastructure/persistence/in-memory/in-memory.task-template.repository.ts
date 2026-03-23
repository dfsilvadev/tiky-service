import {
  type ICreateTaskTemplateDTO,
  type IFindAllTaskTemplatesQueryDTO,
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

  async findManyByFamilyId(
    familyId: string,
    query: IFindAllTaskTemplatesQueryDTO
  ): Promise<{ items: TaskTemplate[]; total: number }> {
    const { page, limit, status, order } = query;
    let filteredTemplates = this.taskTemplates.filter(
      (template) => template.familyId === familyId
    );

    if (status) {
      filteredTemplates = filteredTemplates.filter(
        (template) => template.status === status
      );
    }

    const total = filteredTemplates.length;
    const items = filteredTemplates
      .sort((a, b) => {
        return order === "asc"
          ? a.createdAt.getTime() - b.createdAt.getTime()
          : b.createdAt.getTime() - a.createdAt.getTime();
      })
      .slice((page - 1) * limit, page * limit);

    return { items, total };
  }

  async findOneByIdAndFamilyId(
    id: string,
    familyId: string
  ): Promise<TaskTemplate | null> {
    const taskTemplate = this.taskTemplates.find(
      (template) => template.id === id && template.familyId === familyId
    );
    return taskTemplate ?? null;
  }
}
