import {
  type RecurrenceType,
  type TaskTemplate,
  type TemplateStatus,
  type Weight
} from "../../generated/prisma/client";

export interface ICommonTaskTemplateData {
  readonly title: string;
  readonly weight: Weight;
  readonly baseXp: number;
  readonly recurrenceType: RecurrenceType;
  readonly isMandatory: boolean;
  readonly status: TemplateStatus;
  readonly subtasks: string[];
  readonly description?: string | null;
  readonly recurrencePattern?: string | null;
  readonly scheduledFor?: Date | null;
  readonly timeLimit?: string | null;
  readonly deletedAt?: Date | null;
}

export interface ICreateTaskTemplateDTO extends Omit<
  ICommonTaskTemplateData,
  "deletedAt" | "status"
> {
  readonly accountId: string;
  readonly playerId: string;
  readonly familyId: string;
  readonly status?: TemplateStatus;
}

export type IUpdateTaskTemplateRepositoryDTO = Partial<
  Omit<ICreateTaskTemplateDTO, "accountId" | "familyId">
>;

export interface IFindAllTaskTemplatesQueryDTO {
  readonly page: number;
  readonly limit: number;
  readonly status?: TemplateStatus;
  readonly order: "asc" | "desc";
}

export interface ITaskTemplateRepository {
  create(_input: ICreateTaskTemplateDTO): Promise<TaskTemplate>;
  update(
    _id: string,
    _input: IUpdateTaskTemplateRepositoryDTO
  ): Promise<TaskTemplate>;
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
