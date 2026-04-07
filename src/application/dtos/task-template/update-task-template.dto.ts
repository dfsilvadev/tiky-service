import {
  type RecurrenceType,
  type TemplateStatus,
  type Weight
} from "../../../generated/prisma/client";

export interface IUpdateTaskTemplateDTO {
  readonly title?: string;
  readonly description?: string | null;
  readonly accountId: string;
  readonly playerId?: string;
  readonly weight?: Weight;
  readonly status?: TemplateStatus;
  readonly recurrenceType?: RecurrenceType;
  readonly isMandatory?: boolean;
  readonly recurrencePattern?: string | null;
  readonly scheduledFor?: Date | null;
  readonly timeLimit?: string | null;
  readonly subtasks?: string[];
}
