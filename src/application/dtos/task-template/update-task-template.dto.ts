import {
  type RecurrenceType,
  type Weight
} from "../../../generated/prisma/client";

export interface IUpdateTaskTemplateDTO {
  readonly title?: string;
  readonly description?: string | null;
  readonly weight?: Weight;
  readonly recurrenceType?: RecurrenceType;
  readonly isMandatory?: boolean;
  readonly recurrencePattern?: string | null;
  readonly scheduledFor?: Date | null;
  readonly timeLimit?: string | null;
  readonly subtasks?: string[];
}
