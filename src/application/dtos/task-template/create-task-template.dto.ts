import { RecurrenceType, Weight } from "../../../generated/prisma/client";

export interface ICreateTaskTemplateDTO {
  readonly title: string;
  readonly description?: string | undefined;
  readonly accountId: string;
  readonly playerId: string;
  readonly familyId: string;
  readonly weight: Weight;
  readonly recurrenceType: RecurrenceType;
  readonly isMandatory: boolean;
  readonly recurrencePattern?: string | null;
  readonly scheduledFor?: Date | null;
  readonly timeLimit?: string | null;
  readonly subtasks: string[];
}
