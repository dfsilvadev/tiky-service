import {
  type RecurrenceType,
  type TaskTemplate,
  type TemplateStatus,
  type Weight
} from "../../generated/prisma/client";

export interface ICreateTaskTemplateDTO {
  readonly title: string;
  readonly description?: string | undefined;
  readonly accountId: string;
  readonly familyId: string;
  readonly baseXp: number;
  readonly status?: TemplateStatus;
  readonly weight: Weight;
  readonly recurrenceType: RecurrenceType;
  readonly isMandatory: boolean;
  readonly recurrencePattern?: string | null;
  readonly scheduledFor?: Date | null;
  readonly timeLimit?: string | null;
  readonly subtasks: string[];
}

export interface IFindAllTaskTemplatesQueryDTO {
  readonly page: number;
  readonly limit: number;
  readonly status?: TemplateStatus;
  readonly order: "asc" | "desc";
}

export interface IUpdateTaskTemplateDTO {
  readonly title?: string;
  readonly description?: string | null;
  readonly weight?: Weight;
  readonly baseXp?: number;
  readonly recurrenceType?: RecurrenceType;
  readonly isMandatory?: boolean;
  readonly recurrencePattern?: string | null;
  readonly scheduledFor?: Date | null;
  readonly timeLimit?: string | null;
  readonly subtasks?: string[];
}

export interface ITaskTemplateRepository {
  create(_input: ICreateTaskTemplateDTO): Promise<TaskTemplate>;
  update(_id: string, _input: IUpdateTaskTemplateDTO): Promise<TaskTemplate>;
  delete(_id: string): Promise<TaskTemplate | null>;
  findManyByFamilyId(
    _familyId: string,
    _query: IFindAllTaskTemplatesQueryDTO
  ): Promise<{ items: TaskTemplate[]; total: number }>;
  findOneByIdAndFamilyId(
    _id: string,
    _familyId: string
  ): Promise<TaskTemplate | null>;
}
