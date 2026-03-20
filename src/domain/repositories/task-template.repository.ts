import {
  RecurrenceType,
  TaskTemplate,
  Weight
} from "../../generated/prisma/client";

export interface ICreateTaskTemplateDTO {
  readonly title: string;
  readonly description?: string | undefined;
  readonly accountId: string;
  readonly familyId: string;
  readonly baseXp: number;
  readonly weight: Weight;
  readonly recurrenceType: RecurrenceType;
  readonly isMandatory: boolean;
  readonly recurrencePattern?: string | null;
  readonly scheduledFor?: Date | null;
  readonly timeLimit?: string | null;
  readonly subtasks: string[];
}

export interface ITaskTemplateRepository {
  create(_input: ICreateTaskTemplateDTO): Promise<TaskTemplate>;
}
