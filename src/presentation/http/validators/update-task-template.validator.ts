import { z } from "zod";

import { RecurrenceType, Weight } from "../../../generated/prisma/client";

export const updateTaskTemplateParamsValidatorSchema = z.object({
  id: z.uuid()
});

export const updateTaskTemplateBodyValidatorSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  weight: z.enum(Weight).optional(),
  recurrenceType: z.enum(RecurrenceType).optional(),
  isMandatory: z.boolean().optional(),
  recurrencePattern: z.string().optional(),
  scheduledFor: z.date().optional(),
  timeLimit: z.string().optional(),
  subtasks: z.array(z.string()).optional()
});

export type UpdateTaskTemplateParamsValidatorDTO = z.infer<
  typeof updateTaskTemplateParamsValidatorSchema
>;
export type UpdateTaskTemplateBodyValidatorDTO = z.infer<
  typeof updateTaskTemplateBodyValidatorSchema
>;
