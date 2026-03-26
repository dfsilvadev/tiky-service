import {
  type ICreateTaskTemplateDTO,
  type IFindAllTaskTemplatesQueryDTO,
  type ITaskTemplateRepository,
  type IUpdateTaskTemplateDTO
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
      status: input.status ?? "ACTIVE",
      weight: input.weight,
      recurrenceType: input.recurrenceType,
      isMandatory: input.isMandatory,
      recurrencePattern: input.recurrencePattern ?? null,
      timeLimit: input.timeLimit ?? null,
      scheduledFor: input.scheduledFor ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      subtasks: input.subtasks
    };

    this.taskTemplates.push(newTaskTemplate);
    return newTaskTemplate;
  }

  async update(
    id: string,
    input: IUpdateTaskTemplateDTO
  ): Promise<TaskTemplate> {
    const index = this.taskTemplates.findIndex(
      (template) => template.id === id
    );

    if (index === -1) {
      throw new Error(`TaskTemplate with id '${id}' not found`);
    }

    const existingTemplate = this.taskTemplates[index];
    const updatedTemplate: TaskTemplate = {
      ...existingTemplate,
      ...(input.title !== undefined && { title: input.title }),
      ...(input.description !== undefined && {
        description: input.description
      }),
      ...(input.weight !== undefined && { weight: input.weight }),
      ...(input.baseXp !== undefined && { baseXp: input.baseXp }),
      ...(input.isMandatory !== undefined && {
        isMandatory: input.isMandatory
      }),
      ...(input.recurrenceType !== undefined && {
        recurrenceType: input.recurrenceType
      }),
      ...(input.recurrencePattern !== undefined && {
        recurrencePattern: input.recurrencePattern
      }),
      ...(input.scheduledFor !== undefined && {
        scheduledFor: input.scheduledFor
      }),
      ...(input.timeLimit !== undefined && { timeLimit: input.timeLimit }),
      ...(input.subtasks !== undefined && { subtasks: input.subtasks }),
      updatedAt: new Date()
    };

    this.taskTemplates[index] = updatedTemplate;
    return updatedTemplate;
  }

  async delete(id: string): Promise<TaskTemplate | null> {
    const index = this.taskTemplates.findIndex(
      (template) => template.id === id
    );

    if (index !== -1) {
      this.taskTemplates[index].deletedAt = new Date();
      this.taskTemplates[index].status = "ARCHIVED";
    }

    return this.taskTemplates[index] ?? null;
  }

  async findManyByFamilyId(
    familyId: string,
    query: IFindAllTaskTemplatesQueryDTO
  ): Promise<{ items: TaskTemplate[]; total: number }> {
    const { page, limit, status, order } = query;
    let filteredTemplates = this.taskTemplates.filter(
      (template) =>
        template.familyId === familyId && template.deletedAt === null
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
      (template) =>
        template.id === id &&
        template.familyId === familyId &&
        template.deletedAt === null
    );
    return taskTemplate ?? null;
  }
}
